import requests
import os
import json
from django.http import JsonResponse, HttpResponse
from .models import MapSize, MapVersions, MapPrices
from django.views.decorators.csrf import csrf_exempt
from constants import Delivery


# http://localhost:8000/api/delivery/get_cities/?city=Севаст
def get_cities(request):
    if request.method == 'GET':
        city = request.GET.get('city', 0)
        params = {"token": os.getenv('salesbeat_api_token', '0'),
                  "city": city
                  }
        r = requests.get('{0}{1}'.format(os.getenv('salesbeat_api_route', '/'), 'get_cities'), params=params)

        if r.status_code == 200:
            json_data = json.loads(r.text)
            return JsonResponse(json_data, safe=False, json_dumps_params={'ensure_ascii': False})
        else:
            return HttpResponse(r.text)
    return JsonResponse({"error": "Use GET"})


@csrf_exempt
def get_delivery_methods_by_city(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        products = data.get('products')
        city_id = data.get('delivery').get('delivery_city_id')

        final_json = {}
        for product in products:
            product_customization = product.get('product_customization')
            size = MapSize.objects.get(id=product_customization.get('sizeId'))
            version = MapVersions.objects.get(id=product_customization.get('version')[-1])
            price = MapPrices.objects.get(size=size, version=version)

            if version.needs_delivery:

                params = {"token": os.getenv('salesbeat_api_token', 0),
                          "id": city_id,
                          "weight": price.weight + Delivery.PACKAGE_ADD_WEIGHT,
                          "x": int(size.width + Delivery.PACKAGE_ADD_SPACE),
                          "y": int(size.height + Delivery.PACKAGE_ADD_SPACE),
                          "z": int(size.depth + Delivery.PACKAGE_ADD_SPACE),
                          "price_to_pay": int(price.price),
                          "price_insurance": int(price.price),
                          }
                r = requests.get('{0}{1}'.format(os.getenv('salesbeat_api_route', '/'),
                                                 'get_delivery_methods_by_city'),
                                 params=params)
                if r.status_code == 200:
                    response_data = json.loads(r.text).get('delivery_methods')
                    custom_delivery_data = {}
                    for delivery_type in response_data:
                        custom_delivery_data[delivery_type.get('name')] = delivery_type
                    if not final_json:
                        final_json = custom_delivery_data
                    else:
                        for delivery_name in final_json:
                            if custom_delivery_data.get(delivery_name):
                                final_json[delivery_name]['delivery_price'] +=\
                                    custom_delivery_data.get(delivery_name)['delivery_price']
                            else:
                                del final_json[delivery_name]
                else:
                    return HttpResponse(r.text)
        return JsonResponse(final_json, safe=False, json_dumps_params={'ensure_ascii': False})
    return JsonResponse({"error": "Use POST"})


@csrf_exempt
def get_city_pvz(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        products = data.get('products')
        city_id = data.get('delivery').get('delivery_city_id')

        final_json = {}
        for product in products:
            product_customization = product.get('product_customization')
            size = MapSize.objects.get(id=product_customization.get('sizeId'))
            version = MapVersions.objects.get(id=product_customization.get('version')[-1])
            price = MapPrices.objects.get(size=size, version=version)

            if version.needs_delivery:

                params = {"token": os.getenv('salesbeat_api_token', 0),
                          "id": city_id,
                          "weight": price.weight + Delivery.PACKAGE_ADD_WEIGHT,
                          "x": int(size.width + Delivery.PACKAGE_ADD_SPACE),
                          "y": int(size.height + Delivery.PACKAGE_ADD_SPACE),
                          "z": int(size.depth + Delivery.PACKAGE_ADD_SPACE),
                          "price_to_pay": int(price.price),
                          "price_insurance": int(price.price),
                          }
                r = requests.get('{0}{1}'.format(os.getenv('salesbeat_api_route', '/'),
                                                 'get_city_pvz'),
                                 params=params)
                if r.status_code == 200:
                    response_data = json.loads(r.text).get('pvz_list')
                    custom_delivery_data = {}
                    for delivery_type in response_data:
                        custom_delivery_data[delivery_type.get('id')] = delivery_type
                    if not final_json:
                        final_json = custom_delivery_data
                    else:
                        for delivery_name in final_json:
                            if custom_delivery_data.get(delivery_name):
                                final_json[delivery_name]['delivery_price'] += \
                                    custom_delivery_data.get(delivery_name)['delivery_price']
                            else:
                                del final_json[delivery_name]
                else:
                    return HttpResponse(r.text)
        return JsonResponse(final_json, safe=False, json_dumps_params={'ensure_ascii': False})
    return JsonResponse({"error": "Use POST"})


@csrf_exempt
def check_delivery(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        products = data.get('products')
        for product in products:
            product_customization = product.get('product_customization')
            version = MapVersions.objects.get(id=product_customization.get('version')[-1])
            if version.needs_delivery:
                return JsonResponse({"deliverable": True})
        return JsonResponse({"deliverable": False})
    return JsonResponse({"error": "Use POST"})

