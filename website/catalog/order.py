import json
import logging
from .models import Order, MapOrder, MapVersions, MapSize, MapPrices, MapTheme, VectorImages, VectorColors
from .delivery import get_delivery_methods_by_city
from django.http import HttpResponse, JsonResponse
from constants import MapOrientationTypes
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
            products = data.get('products')
            delivery_price_response = get_delivery_methods_by_city(request)
            delivery_price_json = json.loads(delivery_price_response.content)
            delivery_price = delivery_price_json.get(delivery.get('delivery_type_name')).get('delivery_price')
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
                card_data=data,
                delivery_price=delivery_price
            )

            for product in products:
                product_data = product.get('product_customization')
                size = MapSize.objects.get(id=product_data.get('sizeId'))
                version = MapVersions.objects.get(id=product_data.get('version')[-1])
                price = MapPrices.objects.get(size=size, version=version)
                theme = MapTheme.objects.get(id=product_data.get('theme'))
                try:
                    vector_image = VectorImages.objects.get(id=product_data.get('vector').get('image_id'))
                    vector_color = VectorColors.objects.get(id=product_data.get('vector').get('color_id'))
                except (VectorImages.DoesNotExist, VectorColors.DoesNotExist):
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
                    lng=product_data.get('location').get('lng'),
                    lat=product_data.get('location').get('lat'),
                    city_name=product_data.get('location').get('cityName'),
                    date=product_data.get('date'),
                    zoom=product_data.get('zoom'),
                    vector_color=vector_color,
                    vector_image=vector_image,
                    price=price.price
                )
            order.save()
        except Exception as e:
            order_logger.error('Failed to create order: "%s"' % e)
            order_logger.error('Probably missed order data: "%s"' % request.body)
            return HttpResponse(status=400)
        return HttpResponse(status=201)
    return JsonResponse({"error": "Use POST"})


def order_count(request):
    data = json.loads(request.body)
    logger.info('Count order: "%s"' % data)
