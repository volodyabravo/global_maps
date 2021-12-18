from django.core.files.images import ImageFile
import io
import os
import requests


def print_map(obj):
    json = obj.full_json
    host = os.getenv('PUPPET_HOST', 'puppet')
    port = os.getenv('PUPPET_PORT', '6969')
    path = 'http://{0}:{1}/generatesync/'.format(host, port)
    r = requests.post(path, json=json)

    image = ImageFile(io.BytesIO(r.content), name="{0}_{1}.png".format(obj.pk, obj.date_created))

    obj.image = image
    obj.save()


def print_all_order_maps(obj):
    pass
