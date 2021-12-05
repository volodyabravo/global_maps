import json
import logging
from .models import Order, MapOrder
from .delivery import get_delivery_methods_by_city
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from constants import OrderStatuses


# Get an instance of a logger
logger = logging.getLogger(__name__)
order_logger = logging.getLogger('order')


@csrf_exempt
def order_create(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            order_logger.info('New order: "%s"' % data)
            delivery = data.get('delivery')
            personal = data.get('personal')
            order = Order.objects.create(
                name=personal.get('name'),
                surname=personal.get('surname'),
                email=personal.get('email'),
                phone=personal.get('phone'),
                comment=personal.get('comment'),
                call_back=personal.get('call_back'),
                emails_agree=personal.get('emails_agree'),
                delivery_type_name=delivery.get('delivery_type_name'),
                delivery_type_id=delivery.get('delivery_type_id'),
                delivery_city_name=delivery.get('delivery_city_name'),
                delivery_region=delivery.get('delivery_region'),
                delivery_city_id=delivery.get('delivery_city_id'),
                delivery_address=delivery.get('delivery_address'),
                pvz_id=delivery.get('pvz_id'),
                card_data=data.get('products', {}),
            )
            order.status = OrderStatuses.STATUS_PAID
            order.save()
        except Exception as e:
            order_logger.error('Failed to create order: "%s"' % e)
            order_logger.error('Probably missed order data: "%s"' % request.body)
        return HttpResponse(status=201)
    return JsonResponse({"error": "Use POST"})


def order_count(request):
    data = json.loads(request.body)
    logger.info('Count order: "%s"' % data)
