from amocrm.v2 import Contact as _Contact
from amocrm.v2 import Lead as _Lead
from amocrm.v2 import custom_field
from amocrm.v2 import tokens
import logging
import os
from constants import OrderStatuses


order_logger = logging.getLogger('order')

AMO_CLIENT_ID = os.getenv('AMO_CLIENT_ID', '0')
AMO_CLIENT_SECRET = os.getenv('AMO_CLIENT_SECRET', '0')
AMO_SUBDOMAIN = os.getenv('AMO_SUBDOMAIN', '0')
AMO_REDIRECT_URL = os.getenv('AMO_REDIRECT_URL', '0')
AMO_REFRESH_TOKEN = os.getenv('AMO_REFRESH_TOKEN', '0')
DIR_NAME = os.path.dirname(os.path.abspath(__file__))


class Lead(_Lead):
    delivery_type = custom_field.TextCustomField("Способ доставки", field_id=813453)
    address = custom_field.TextCustomField("Адрес", field_id=813455)
    products = custom_field.TextAreaCustomField("Товары", field_id=816113)
    order_id = custom_field.NumericCustomField("Id заказа", field_id=813465)
    order_link = custom_field.TextCustomField("Ссылка на заказ", field_id=813467)
    comments = custom_field.TextCustomField("Комментарии", field_id=813475)
    delivery_budget = custom_field.NumericCustomField("Бюджет доставки", field_id=814975)


class Contact(_Contact):
    phone = custom_field.ContactPhoneField("Телефон", code="PHONE")
    email = custom_field.ContactEmailField("Email", code="EMAIL")
    country = custom_field.TextCustomField("Страна", field_id=813469)
    city = custom_field.TextCustomField("Город", field_id=813471)


def send_order_to_ammo(instance):
    try:
        if AMO_CLIENT_ID:
            t = tokens.default_token_manager(
                client_id=AMO_CLIENT_ID,
                client_secret=AMO_CLIENT_SECRET,
                subdomain=AMO_SUBDOMAIN,
                redirect_url=AMO_REDIRECT_URL,
                storage=tokens.FileTokensStorage('{0}/tokens/'.format(DIR_NAME)),  # by default FileTokensStorage
            )
            tokens.default_token_manager.init(code=AMO_REFRESH_TOKEN, skip_error=True)

            lead = Lead(name=instance.name,
                        status=instance.status,
                        delivery_type=instance.delivery_type_name,
                        address=instance.delivery_address,
                        comments=instance.comment,
                        order_id=instance.id,
                        delivery_budget=instance.delivery_price,
                        price=instance.total_price,
                        order_link="https://stylemaps.ru/admin/catalog/order/{0}/change/".format(instance.id),
                        )
            lead.create()
            instance.ammo_id = lead.id

            contact = Contact(first_name=instance.name,
                              phone=instance.phone,
                              email=instance.email,
                              country=instance.delivery_region,
                              city=instance.delivery_city_name,
                              )
            contact.create()

            lead.contacts.append(contact)
            lead.save()
    except Exception as e:
        print(e)
        order_logger.error('Failed to send order with id {1} at amo: {0}'.format(e, instance.id))


def sync_orders(instance):
    try:
        if AMO_CLIENT_ID:
            tokens.default_token_manager(
                client_id=AMO_CLIENT_ID,
                client_secret=AMO_CLIENT_SECRET,
                subdomain=AMO_SUBDOMAIN,
                redirect_url=AMO_REDIRECT_URL,
                storage=tokens.FileTokensStorage('{0}/tokens/'.format(DIR_NAME)),
                # products=instance.products,
                # images=instance.images,  # by default FileTokensStorage
            )
            tokens.default_token_manager.init(code=AMO_REFRESH_TOKEN, skip_error=True)

            lead = Lead.objects.get(instance.ammo_id)
            if lead.status == OrderStatuses.STATUS_ORDER:
                lead.status = instance.status
            lead.order_id = instance.id
            lead.order_link = "https://stylemaps.ru/admin/catalog/order/{0}/change/".format(instance.id)
            lead.price = instance.total_price

            products_links = []
            products = instance.products.all()
            for product in products:
                products_links.append("https://stylemaps.ru/admin/catalog/maporder/{0}/change/".format(product.id))
            products_str = '\n'.join([str(elem) for elem in products_links])
            lead.products = products_str
    
            lead.save()
    except Exception as e:
        print(e)
        order_logger.error('Failed to update order with id {1} at amo: {0}'.format(e, instance.id))
