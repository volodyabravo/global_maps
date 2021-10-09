from djmoney.models.fields import MoneyField
from django.db import models
from django.utils.translation import ugettext_lazy as _
from constants import MapTypes, MapOrderStatuses, MapProducingVersions, MapSizeUnits


class MapTheme(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    product = models.IntegerField(_('Map'), choices=[(key, value) for key, value in MapTypes.TYPES.items()], default=1,
                                  blank=False, null=False)
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    preview = models.ImageField(_('Preview image'), upload_to='uploads/images/preview/', blank=True)
    data = models.JSONField(_('JSON data'), blank=True, null=True)


class MapSize(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    version = models.IntegerField(_('Map Producing Version'), default=1, blank=False, null=False,
                                  choices=[(key, value) for key, value in MapProducingVersions.VERSIONS.items()])
    price = MoneyField(_('Price'), max_digits=10, decimal_places=2, null=True, default_currency='RUB')
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    height = models.PositiveIntegerField(_('Height'), blank=False, null=False)
    width = models.PositiveIntegerField(_('Width'), blank=False, null=False)
    units = models.IntegerField(_('Map size units'), default=1, blank=False, null=False,
                                choices=[(key, value) for key, value in MapSizeUnits.UNITS.items()])


class MapPrices(models.Model):
    price = MoneyField(_('Price'), max_digits=10, decimal_places=2, null=True, default_currency='RUB')
    product = models.IntegerField(_('Map'), choices=[(key, value) for key, value in MapTypes.TYPES.items()], default=0,
                                  blank=False, null=False, unique=True)


class MapVersions(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    version = models.IntegerField(_('Map Producing Version'), default=1, blank=False, null=False,
                                  choices=[(key, value) for key, value in MapProducingVersions.VERSIONS.items()])
    price = MoneyField(_('Price'), max_digits=10, decimal_places=2, null=True, default_currency='RUB')
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    image = models.ImageField(_('Image'), upload_to='uploads/images/static/', blank=True)


class MapOrder(models.Model):
    status = models.IntegerField(_('Status'), default=1, blank=False, null=False,
                                 choices=[(key, value) for key, value in MapOrderStatuses.STATUSES.items()])
    date = models.DateTimeField(_('Date and time'), auto_now=True)
    data = models.JSONField(_('JSON data'), blank=True, null=True)
    image = models.ImageField(_('Generated image'), upload_to='uploads/images/generated/', blank=True)
