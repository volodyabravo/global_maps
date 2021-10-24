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
    image = models.ImageField(_('Image'), upload_to='uploads/images/static/', blank=True)

    def __str__(self):
        return '{0} для {1}'.format(self.name, MapTypes.TYPES.get(self.product))

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'


class MapSize(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    version = models.IntegerField(_('Map Producing Version'), default=1, blank=False, null=False,
                                  choices=[(key, value) for key, value in MapProducingVersions.VERSIONS.items()])
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    height = models.PositiveIntegerField(_('Height'), blank=False, null=False)
    width = models.PositiveIntegerField(_('Width'), blank=False, null=False)

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta:
        verbose_name = 'Размер'
        verbose_name_plural = 'Размеры'


class MapVersions(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    version = models.IntegerField(_('Map Producing Version'), default=1, blank=False, null=False,
                                  choices=[(key, value) for key, value in MapProducingVersions.VERSIONS.items()])
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    image = models.ImageField(_('Image'), upload_to='uploads/images/static/', blank=True)

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta:
        verbose_name = 'Версия'
        verbose_name_plural = 'Версии'


class MapPrices(models.Model):
    price = MoneyField(_('Price'), max_digits=10, decimal_places=2, null=True, default_currency='RUB')
    size = models.ForeignKey(MapSize, blank=True, null=True, on_delete=models.RESTRICT)
    version = models.ForeignKey(MapVersions, blank=True, null=True, on_delete=models.RESTRICT)

    def __str__(self):
        return '{0} {1}'.format(self.size, self.version)

    class Meta:
        unique_together = [['size', 'version']]
        verbose_name = 'Цена'
        verbose_name_plural = 'Цены'


class Order(models.Model):
    date = models.DateTimeField(_('Date and time'), auto_now=True)
    data = models.JSONField(_('JSON data'), blank=True, null=True)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class MapOrder(models.Model):
    order = models.ForeignKey(Order, blank=True, null=True, on_delete=models.RESTRICT)
    status = models.IntegerField(_('Status'), default=1, blank=False, null=False,
                                 choices=[(key, value) for key, value in MapOrderStatuses.STATUSES.items()])
    date = models.DateTimeField(_('Date and time'), auto_now=True)
    data = models.JSONField(_('JSON data'), blank=True, null=True)
    image = models.ImageField(_('Generated image'), upload_to='uploads/images/generated/', blank=True)

    def __str__(self):
        return '{0} {1}'.format(MapOrderStatuses.STATUSES.get(self.status), self.date)

    class Meta:
        verbose_name = 'Генерация карты'
        verbose_name_plural = 'Генерации карт'
