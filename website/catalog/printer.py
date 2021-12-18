from .models import MapOrder, Order
from django.core.files.images import ImageFile
import re, io
from base64 import decodebytes
from django.core.files import File
import requests


def print_map(obj):
    json = obj.full_json
    r = requests.post('http://puppet:6969/generatesync/', json=json)

    image = ImageFile(io.BytesIO(r.content), name="{0}_{1}.png".format(obj.pk, obj.date_created))

    obj.image = image
    obj.save()


def print_all_order_maps(obj):
    pass
