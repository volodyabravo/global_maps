from amocrm.v2.entity.lead import Lead
from amocrm.v2 import tokens
import os
from django.conf import settings


def send_order_to_ammo(instance):
    t = tokens.default_token_manager(
        client_id=os.getenv('AMO_CLIENT_ID', '0'),
        client_secret=os.getenv('AMO_CLIENT_SECRET', '0'),
        subdomain=os.getenv('AMO_SUBDOMAIN', '0'),
        redirect_url=os.getenv('AMO_REDIRECT_URL', '0'),
        storage=tokens.FileTokensStorage(settings.BASE_DIR),  # by default FileTokensStorage
    )
    tokens.default_token_manager.init(code=os.getenv('AMO_REFRESH_TOKEN', '0'), skip_error=True)

    lead = Lead(name=instance.name, status=instance.status)
    lead.create()
    instance.ammo_id = lead.id


def sync_orders(instance):
    tokens.default_token_manager(
        client_id=os.getenv('AMO_CLIENT_ID', '0'),
        client_secret=os.getenv('AMO_CLIENT_SECRET', '0'),
        subdomain=os.getenv('AMO_SUBDOMAIN', '0'),
        redirect_url=os.getenv('AMO_REDIRECT_URL', '0'),
        storage=tokens.FileTokensStorage(settings.BASE_DIR),  # by default FileTokensStorage
    )
    tokens.default_token_manager.init(code=os.getenv('AMO_REFRESH_TOKEN', '0'), skip_error=True)

    lead = Lead.objects.get(instance.ammo_id)
    lead.status = instance.status
    lead.save()
