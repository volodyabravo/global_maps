from djmoney.models.fields import MoneyField
from django.db import models
from django.utils.translation import ugettext_lazy as _
from constants import MapTypes, MapOrderStatuses, MapSizeUnits, OrderStatuses
from django.db.models.signals import pre_save
from django.dispatch import receiver
from colorfield.fields import ColorField
from .amo import send_order_to_ammo, sync_orders


class MapTheme(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    product = models.IntegerField(_('Map'), choices=[(key, value) for key, value in MapTypes.TYPES.items()], default=1,
                                  blank=False, null=False)
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    preview = models.ImageField(_('Preview image'), upload_to='uploads/images/preview/', blank=True)
    data = models.JSONField(_('JSON data'), blank=True, null=True)
    image = models.ImageField(_('Image'), upload_to='uploads/images/themes/', blank=True)

    def __str__(self):
        return '{0} для {1}'.format(self.name, MapTypes.TYPES.get(self.product))

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = 'Темы'


class MapVersions(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.RESTRICT)
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    image = models.ImageField(_('Image'), upload_to='uploads/images/versions/', blank=True)

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta:
        verbose_name = 'Версия'
        verbose_name_plural = 'Версии'


class MapSize(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    # version = models.ForeignKey(MapVersions, blank=True, null=True, on_delete=models.RESTRICT)
    name = models.CharField(_('Name'), blank=False, null=False, max_length=500)
    height = models.PositiveIntegerField(_('Height'), blank=False, null=False)
    width = models.PositiveIntegerField(_('Width'), blank=False, null=False)
    depth = models.PositiveIntegerField(_('Depth'), blank=False, null=False, default=5)
    height_px = models.PositiveIntegerField(_('Height in px upon render'), blank=False, null=False, default=0)
    width_px = models.PositiveIntegerField(_('Width in px upon render'), blank=False, null=False, default=0)
    scale = models.PositiveIntegerField(_('Scale upon render'), blank=False, null=False, default=1)

    def __str__(self):
        return '{0}'.format(self.name)

    class Meta:
        verbose_name = 'Размер'
        verbose_name_plural = 'Размеры'


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
    status = models.IntegerField(_('Status'), default=OrderStatuses.STATUS_ORDER, blank=False, null=False,
                                 choices=[(key, value) for key, value in OrderStatuses.STATUSES.items()])
    date = models.DateTimeField(_('Date and time'), auto_now=True)
    card_data = models.JSONField(_('JSON data'), blank=True, null=True)
    ammo_id = models.IntegerField(_('ammo lead id'), blank=True, null=True)
    name = models.CharField(_('Name'), blank=True, null=True, max_length=500)
    surname = models.CharField(_('Surname'), blank=True, null=True, max_length=500)
    phone = models.CharField(_('Phone'), blank=True, null=True, max_length=20)
    email = models.EmailField(_('Email'), blank=True, null=True, max_length=500)
    comment = models.TextField(_('Comments'), blank=True, null=True, max_length=5000)
    track = models.IntegerField(_('Track number'), blank=True, null=True)

    delivery_type_name = models.CharField(_('delivery_type_name'), blank=True, null=True, max_length=500)
    delivery_type_id = models.CharField(_('delivery_type_id'), blank=True, null=True, max_length=500)
    delivery_city_name = models.CharField(_('delivery_city_name'), blank=True, null=True, max_length=500)
    delivery_region = models.CharField(_('delivery_region'), blank=True, null=True, max_length=500)
    delivery_city_id = models.CharField(_('delivery_city_id'), blank=True, null=True, max_length=500)
    delivery_address = models.CharField(_('delivery_address'), blank=True, null=True, max_length=500)
    pvz_id = models.CharField(_('pvz_id'), blank=True, null=True, max_length=500)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'


class MapOrder(models.Model):
    order = models.ForeignKey(Order, related_name="products", blank=True, null=True, on_delete=models.RESTRICT)
    status = models.IntegerField(_('Status'), default=1, blank=False, null=False,
                                 choices=[(key, value) for key, value in MapOrderStatuses.STATUSES.items()])
    date = models.DateTimeField(_('Date and time'), auto_now=True)
    size = models.ForeignKey(MapSize, blank=True, null=True, on_delete=models.RESTRICT)
    theme = models.ForeignKey(MapTheme, blank=True, null=True, on_delete=models.RESTRICT)
    headline = models.CharField(_('headline'), blank=True, null=True, max_length=500)
    divider = models.CharField(_('divider'), blank=True, null=True, max_length=500)
    tagline = models.CharField(_('tagline'), blank=True, null=True, max_length=500)
    subline = models.CharField(_('subline'), blank=True, null=True, max_length=500)
    image = models.ImageField(_('Generated image'), upload_to='uploads/images/generated/', blank=True)
    zoom = models.IntegerField(_('Zoom'), blank=True, null=True)
    x = models.IntegerField(_('x'), blank=True, null=True)
    y = models.IntegerField(_('y'), blank=True, null=True)
    exception_text = models.CharField(_('subline'), blank=True, null=True, max_length=5000)

    def __str__(self):
        return '{0} {1}'.format(MapOrderStatuses.STATUSES.get(self.status), self.date)

    class Meta:
        verbose_name = 'Генерация карты'
        verbose_name_plural = 'Генерации карт'


class VectorImages(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    image = models.TextField(_('Image SVG'), blank=True, null=True, max_length=100000)

    class Meta:
        verbose_name = 'Изображение векторной карты'
        verbose_name_plural = 'Изображения векторных карт'


class VectorColors(models.Model):
    active = models.BooleanField(_('Is this active'), default=True)
    order = models.IntegerField(_('Position in list'), default=1, blank=False, null=False)
    color_background = ColorField(default='#FF0000')
    color_vector = ColorField(default='#FF0000')
    color_text = ColorField(default='#FF0000')

    class Meta:
        verbose_name = 'Цвет векторной карты'
        verbose_name_plural = 'Цвета векторных карт'


@receiver(pre_save, sender=Order)
def order_to_ammo(instance, **_):
    if instance.id is None or not instance.ammo_id:
        send_order_to_ammo(instance)
    else:
        previous = Order.objects.get(id=instance.id)
        if previous.status != instance.status:
            sync_orders(instance)


# @receiver(pre_save, sender=Order)
# def generate_image(instance, **_) :

