from django.utils.translation import ugettext_lazy as _


class MapTypes:
    TYPE_SKY_MAP = 1
    TYPE_STREET_MAP = 2
    TYPES = {
        TYPE_SKY_MAP: _('Sky map'),
        TYPE_STREET_MAP: _('Street map')
    }
