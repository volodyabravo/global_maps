import json
import requests
import os
from django.http import HttpResponse, JsonResponse
from .models import MapPrices
from django.shortcuts import get_object_or_404
from datetime import timedelta, datetime
from constants import MapTypes
import logging


payment_logger = logging.getLogger('payment')


def create_payment(order):
    product_price = order.total_price
    if product_price:
        delivery_price = order.delivery_price
        total_price = (product_price + delivery_price) * 100
        host = os.getenv('HOST', 'https://stylemaps.ru/')
        life_date = datetime.now() + timedelta(days=60)
        life_date = life_date.strftime("%Y-%m-%dT%H:%M:%S")

        receipt = {
            "Email": order.email,
            "Phone": order.phone,
            "EmailCompany": "style-maps@yandex.ru",
            "Taxation": "usn_income",
            "Items": []
            }

        for product in order.products.all():
            price = get_object_or_404(MapPrices, size=product.size, version=product.version)
            receipt['Items'].append(
                {
                    "Name": str(MapTypes.TYPES.get(product.product, 'Интерьерная карта')),
                    "Price": price.price * 100,
                    "Quantity": 1.00,
                    "Amount": price.price * 100,
                    "PaymentMethod": "full_prepayment",
                    "PaymentObject": "commodity",
                    "Tax": "vat0",
                }
            )

        receipt['Items'].append(
            {
                "Name": "Доставка",
                "Price": delivery_price * 100,
                "Quantity": 1.00,
                "Amount": delivery_price * 100,
                "PaymentMethod": "full_prepayment",
                "PaymentObject": "commodity",
                "Tax": "vat0",
            }
        )

        payment_data = {
            'TerminalKey': os.getenv('TERMINALKEY', '0'),
            'Amount': total_price,
            'OrderId': order.id,
            'SuccessURL': '{0}/order/{1}/#success'.format(host, order.id),
            'FailURL': '{0}/order/{1}/#fail'.format(host, order.id),
            'NotificationURL': '{0}/api/order/update_payment/'.format(host),
            # 'RedirectDueDate': life_date,
            'Description': 'Полиграфическая продукция',
            "DATA": {"Phone": order.phone, "Email": order.email},
            "Receipt": receipt
        }
        headers = {'Content-Type': 'application/json'}
        r = requests.post('https://securepay.tinkoff.ru/v2/Init', json=payment_data, headers=headers)
        r_data = json.loads(r.text)
        if r_data.get('PaymentURL', None):
            order.payment_url = r_data.get('PaymentURL')
            order.payment_id = r_data.get('PaymentId')
            order.payment_status = r_data.get('Status')
            order.save()
        else:
            payment_logger.error('Failed to create payment for order {1} : {0}'.format(r_data, order.id))
