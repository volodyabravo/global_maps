from django.utils.translation import ugettext_lazy as _


class MapTypes:
    TYPE_SKY_MAP = 1
    TYPE_STREET_MAP = 2
    TYPE_VECTOR = 3
    TYPES = {
        TYPE_SKY_MAP: _('Sky map'),
        TYPE_STREET_MAP: _('Street map'),
        TYPE_VECTOR: _('Vector image')

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


class MapOrientationTypes:
    TYPE_PORTRAIT = 1
    TYPE_LANDSCAPE = 2
    TYPES = {
        TYPE_PORTRAIT: 'portrait',
        TYPE_LANDSCAPE: 'landscape'
    }


class OrderStatuses:
    # Amo pipelines id`s
    STATUS_ORDER = 43263424
    STATUS_PAID = 43263229
    STATUS_PRINT = 43263232
    STATUS_FOR_PACKAGE = 43263235
    STATUS_PACKAGE = 43263238
    STATUS_FOR_DELIVER = 43263427
    STATUS_DELIVER = 43263430
    STATUS_PICKUP = 43263433
    STATUS_FINISHED = 142
    STATUS_CLOSED = 143
    STATUSES = {
        STATUS_ORDER: 'Заказ',
        STATUS_PAID: 'Оплачено',
        STATUS_PRINT: 'Печать',
        STATUS_FOR_PACKAGE: 'На упаковку',
        STATUS_PACKAGE: 'Упаковка',
        STATUS_FOR_DELIVER: 'На доставку',
        STATUS_DELIVER: 'Доставка',
        STATUS_PICKUP: 'Самовывоз',
        STATUS_FINISHED: 'Успешно реализовано',
        STATUS_CLOSED: 'Закрыто и не реализовано',
    }


class Delivery:
    PACKAGE_ADD_SPACE = 5
    PACKAGE_ADD_WEIGHT = 200
