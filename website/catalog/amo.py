from amocrm.v2.entity.lead import Lead
from amocrm.v2 import tokens
import os

AMO_CLIENT_ID = os.getenv('AMO_CLIENT_ID', '0')
AMO_CLIENT_SECRET = os.getenv('AMO_CLIENT_SECRET', '0')
AMO_SUBDOMAIN = os.getenv('AMO_SUBDOMAIN', '0')
AMO_REDIRECT_URL = os.getenv('AMO_REDIRECT_URL', '0')
AMO_REFRESH_TOKEN = os.getenv('AMO_REFRESH_TOKEN', '0')
DIR_NAME = os.path.dirname(os.path.abspath(__file__))


def send_order_to_ammo(instance):
    if AMO_CLIENT_ID:
        t = tokens.default_token_manager(
            client_id=AMO_CLIENT_ID,
            client_secret=AMO_CLIENT_SECRET,
            subdomain=AMO_SUBDOMAIN,
            redirect_url=AMO_REDIRECT_URL,
            storage=tokens.FileTokensStorage(DIR_NAME),  # by default FileTokensStorage
        )
        tokens.default_token_manager.init(code=AMO_REFRESH_TOKEN, skip_error=True)

        lead = Lead(name=instance.name, status=instance.status)
        lead.create()
        instance.ammo_id = lead.id


def sync_orders(instance):
    if AMO_CLIENT_ID:
        tokens.default_token_manager(
            client_id=AMO_CLIENT_ID,
            client_secret=AMO_CLIENT_SECRET,
            subdomain=AMO_SUBDOMAIN,
            redirect_url=AMO_REDIRECT_URL,
            storage=tokens.FileTokensStorage(DIR_NAME),  # by default FileTokensStorage
        )
        tokens.default_token_manager.init(code=AMO_REFRESH_TOKEN, skip_error=True)

        lead = Lead.objects.get(instance.ammo_id)
        lead.status = instance.status
        lead.save()
