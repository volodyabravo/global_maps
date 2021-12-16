import json
import logging
from .models import Order, MapOrder, MapVersions, MapSize, MapPrices, MapTheme, VectorImages, VectorColors
from .delivery import get_delivery_methods_by_city
from django.http import HttpResponse, JsonResponse
from constants import MapOrientationTypes
from django.views.decorators.csrf import csrf_exempt
from constants import OrderStatuses
from django.shortcuts import get_object_or_404
from .tinkoff import create_payment
from .amo import send_order_to_ammo, sync_orders


# Get an instance of a logger
logger = logging.getLogger(__name__)
order_logger = logging.getLogger('order')


@csrf_exempt
def order_create(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        order_logger.info('New order: "%s"' % data)
        delivery = data.get('delivery')
        personal = data.get('personal')
        products = data.get('products')
        delivery_price_response = get_delivery_methods_by_city(request)
        delivery_price_json = json.loads(delivery_price_response.content)
        delivery_price = 0
        if delivery_price_json:
            delivery_price = delivery_price_json.get(delivery.get('delivery_type_name')).get('delivery_price')
        delivery_address = delivery.get('delivery_street')
        if delivery.get('delivery_entrance'):
            delivery_address += ', подтезд {0}'.format(delivery.get('delivery_entrance'))
        if delivery.get('delivery_floor'):
            delivery_address += ', этаж {0}'.format(delivery.get('delivery_floor'))
        if delivery.get('delivery_apartments'):
            delivery_address += ', квартира {0}'.format(delivery.get('delivery_apartments'))

        order = Order.objects.create(
            name=personal.get('name'),
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
            delivery_address=delivery_address,
            pvz_id=delivery.get('pvz_id'),
            card_data=data,
            delivery_price=delivery_price
        )

        for product in products:
            product_data = product.get('product_customization')
            size = get_object_or_404(MapSize, pk=product_data.get('sizeId'))
            version = get_object_or_404(MapVersions.objects, pk=product_data.get('version')[-1])
            price = get_object_or_404(MapPrices, size=size, version=version)
            theme = get_object_or_404(MapTheme, pk=product_data.get('theme'))
            try:
                vector_image = VectorImages.objects.get(id=product_data.get('vector').get('image_id'))
                vector_color = VectorColors.objects.get(id=product_data.get('vector').get('color_id'))
            except (VectorImages.DoesNotExist, VectorColors.DoesNotExist, AttributeError):
                vector_color = None
                vector_image = None
            MapOrder.objects.create(
                order=order,
                size=size,
                theme=theme,
                product=theme.product,
                version=version,
                headline=product_data.get('headline'),
                divider=product_data.get('divider'),
                tagline=product_data.get('tagline'),
                subline=product_data.get('subline'),
                orientation=product_data.get('orientation'),
                lng=product_data.get('location', {}).get('lng', None),
                lat=product_data.get('location', {}).get('lat', None),
                city_name=product_data.get('location', {}).get('cityName', None),
                date=product_data.get('date'),
                zoom=product_data.get('zoom'),
                vector_color=vector_color,
                vector_image=vector_image,
                price=price.price
            )

        total_price = 0
        for product in order.products.all():
            total_price += product.price
        order.total_price = total_price

        order.save()

        create_payment(order)

        order_data = {
            "amount": order.delivery_price + order.total_price,
            "order": order.id,
            "name": order.name,
            "email": order.email,
            "phone": order.phone,
        }
        if order.payment_url:
            order_data['url'] = order.payment_url
        send_order_to_ammo(order)
        order.save()

        return JsonResponse(order_data)
    return JsonResponse({"error": "Use POST"})


@csrf_exempt
def order_get(request):
    if request.method == 'GET':
        order = Order.objects.get(id=request.GET.get('order_id'))
        order_data = {
            "amount": order.delivery_price + order.total_price,
            "order": order.id,
            "name": order.name,
            "email": order.email,
            "phone": order.phone
        }
        return JsonResponse(order_data)


@csrf_exempt
def update_payment(request):
    data = json.loads(request.body)
    return HttpResponse(status=200)
