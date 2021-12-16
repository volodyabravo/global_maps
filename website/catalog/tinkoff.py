import json
import requests
import os
from django.http import HttpResponse, JsonResponse
from .models import Order
from django.shortcuts import get_object_or_404


def create_payment(request):
    if request.method == 'GET':
        order_id = request.GET.get('order_id')
        order = get_object_or_404(Order, pk=order_id)
        product_price = order.total_price
        delivery_price = order.delivery_price
        total_price = 0
        if product_price and delivery_price:
            total_price = (product_price + delivery_price) * 100
        if total_price:
            host = os.getenv('HOST', 'https://stylemaps.ru/')
            payment_data = {
                'TerminalKey': os.getenv('TERMINALKEY', '0'),
                'Amount': total_price,
                'OrderId': order_id,
                'SuccessURL': '{0}api/submit_payment/'.format(host),
                'FailURL': '{0}'.format(host),
                'NotificationURL': '{0}api/order/update_payment/'.format(host)
            }
            headers = {'Content-Type': 'application/json'}
            r = requests.post('https://securepay.tinkoff.ru/v2/Init', json=payment_data, headers=headers)
            r_data = json.loads(r.text)
            if r_data.get('PaymentURL', None):
                final_response = {'url': r_data.get('PaymentURL')}
                return JsonResponse(final_response)
            else:
                return JsonResponse(r_data, safe=False, json_dumps_params={'ensure_ascii': False})
        return HttpResponse(status=400)
    return JsonResponse({"error": "Use GET"})


def update_payment(request):
    return HttpResponse(status=200)
