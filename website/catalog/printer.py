from django.core.files.images import ImageFile
import io
import os
import requests


def print_map(obj):
    try:
        json = obj.full_json
        host = os.getenv('PUPPET_HOST', 'puppet')
        port = os.getenv('PUPPET_PORT', '6969')
        path = 'http://{0}:{1}/generatesync/'.format(host, port)
        r = requests.post(path, json=json)

        image = ImageFile(io.BytesIO(r.content), name="{0}_{1}.png".format(obj.pk, obj.date_created))

        obj.image = image
        obj.save()
    except Exception:
        pass


def print_all_order_maps(obj):
    try:
        maps = obj.products.all()
        for map in maps:
            print_map(map)
    except Exception:
        pass
