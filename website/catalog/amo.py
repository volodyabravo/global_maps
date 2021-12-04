from amocrm.v2 import Contact as _Contact
from amocrm.v2 import Company as _Company
from amocrm.v2 import Lead as _Lead
from amocrm.v2 import custom_field
from amocrm.v2 import tokens
import os

AMO_CLIENT_ID = os.getenv('AMO_CLIENT_ID', '0')
AMO_CLIENT_SECRET = os.getenv('AMO_CLIENT_SECRET', '0')
AMO_SUBDOMAIN = os.getenv('AMO_SUBDOMAIN', '0')
AMO_REDIRECT_URL = os.getenv('AMO_REDIRECT_URL', '0')
AMO_REFRESH_TOKEN = os.getenv('AMO_REFRESH_TOKEN', '0')
DIR_NAME = os.path.dirname(os.path.abspath(__file__))


class Lead(_Lead):
    price = custom_field.ContactPhoneField("Цена", code="PRICE")
    delivery_type = custom_field.TextCustomField("Способ доставки", field_id=813453)
    address = custom_field.TextCustomField("Адрес", field_id=813455)
    products = custom_field.TextCustomField("Адрес", field_id=813461)
    images = custom_field.TextAreaCustomField("Изображения", field_id=813463)
    order_id = custom_field.NumericCustomField("Id заказа", field_id=813465)
    order_link = custom_field.TextCustomField("Ссылка на заказ", field_id=813467)
    comments = custom_field.TextCustomField("Комментарии", field_id=813475)


class Contact(_Contact):
    phone = custom_field.ContactPhoneField("Телефон", code="PHONE")
    email = custom_field.ContactEmailField("Email", code="EMAIL")
    country = custom_field.TextCustomField("Страна", field_id=813469)
    city = custom_field.TextCustomField("Город", field_id=813471)


def send_order_to_ammo(instance):
    if AMO_CLIENT_ID:
        t = tokens.default_token_manager(
            client_id=AMO_CLIENT_ID,
            client_secret=AMO_CLIENT_SECRET,
            subdomain=AMO_SUBDOMAIN,
            redirect_url=AMO_REDIRECT_URL,
            storage=tokens.FileTokensStorage(DIR_NAME),  # by default FileTokensStorage
        )
        tokens.default_token_manager.init(code=AMO_REFRESH_TOKEN, skip_error=True)

        lead = Lead(name=instance.name,
                    status=instance.status,
                    delivery_type=instance.delivery_type_name,
                    address=instance.delivery_address,
                    comments=instance.comment,
                    order_id=instance.id,
                    order_link="https://stylemaps.ru/admin/catalog/order/{0}/change/".format(instance.id),
                    )
        lead.create()
        instance.ammo_id = lead.id

        contact = Contact(first_name=instance.name,
                          last_name=instance.surname,
                          phone=instance.phone,
                          email=instance.email,
                          country=instance.delivery_region,
                          city=instance.delivery_city_name,
                          )
        contact.create()

        lead.contacts.append(contact)
        lead.save()


def sync_orders(instance):
    if AMO_CLIENT_ID:
        tokens.default_token_manager(
            client_id=AMO_CLIENT_ID,
            client_secret=AMO_CLIENT_SECRET,
            subdomain=AMO_SUBDOMAIN,
            redirect_url=AMO_REDIRECT_URL,
            storage=tokens.FileTokensStorage(DIR_NAME),
            # products=instance.products,
            # images=instance.images,  # by default FileTokensStorage
        )
        tokens.default_token_manager.init(code=AMO_REFRESH_TOKEN, skip_error=True)

        lead = Lead.objects.get(instance.ammo_id)
        lead.status = instance.status
        lead.order_id = instance.id
        lead.order_link = "https://stylemaps.ru/admin/catalog/order/{0}/change/".format(instance.id)
        lead.save()
