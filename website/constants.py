from django.utils.translation import ugettext_lazy as _


class MapTypes:
    TYPE_SKY_MAP = 1
    TYPE_STREET_MAP = 2
    TYPES = {
        TYPE_SKY_MAP: _('Sky map'),
        TYPE_STREET_MAP: _('Street map')
    }


class MapProducingVersions:
    VERSION_WEB = 1
    VERSION_PRINT = 2
    VERSIONS = {
        VERSION_WEB: _('Web version'),
        VERSION_PRINT: _('Print version')
    }


class MapOrderStatuses:
    STATUS_CREATED = 1
    STATUS_GENERATED = 2
    STATUS_ERROR = 3
    STATUSES = {
        STATUS_CREATED: _('Created'),
        STATUS_GENERATED: _('Generated'),
        STATUS_ERROR: _('Error')
    }


class MapSizeUnits:
    UNIT_PIXELS = 1
    UNIT_CENTIMETERS = 2
    UNITS = {
        UNIT_PIXELS: _('px'),
        UNIT_CENTIMETERS: _('cm'),
    }
