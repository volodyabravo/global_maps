import requests
import os
import json
from django.http import JsonResponse, HttpResponse


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
    return JsonResponse({"error": "Недопустимый http метод, используйте Get"})


# http://localhost:8000/api/delivery/get_delivery_methods_by_city/?&city_id=6fdecb78-893a-4e3f-a5ba-aa062459463b&weight=200&x=20&y=10&z=5
def get_delivery_methods_by_city(request):
    if request.method == 'GET':
        city_id = request.GET.get('city_id', 0)
        weight = request.GET.get('weight', 0)
        x = request.GET.get('x', 0)
        y = request.GET.get('y', 0)
        z = request.GET.get('z', 0)
        price_to_pay = request.GET.get('price', 8000)
        price_insurance = request.GET.get('price_insurance', 8000)
        params = {"token": os.getenv('salesbeat_api_token', 0),
                  "id": city_id,
                  "weight": int(weight),
                  "x": int(x),
                  "y": int(y),
                  "z": int(z),
                  "price_to_pay": int(price_to_pay),
                  "price_insurance": int(price_insurance),
                  }
        r = requests.get('{0}{1}'.format(os.getenv('salesbeat_api_route', '/'), 'get_delivery_methods_by_city'), params=params)
        if r.status_code == 200:
            json_data = json.loads(r.text)
            return JsonResponse(json_data, safe=False, json_dumps_params={'ensure_ascii': False})
        else:
            return HttpResponse(r.text)
    return JsonResponse({"error": "Недопустимый http метод, используйте Get"})
