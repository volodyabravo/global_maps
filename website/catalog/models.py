from django.db import models
from django.utils.translation import ugettext_lazy as _
from constants import MapTypes


class Theme(models.Model):
    order = models.IntegerField(_('Theme position in themes list'), default=1, blank=False, null=False)
    product = models.IntegerField(_('Type'), choices=[(key, value) for key, value in MapTypes.TYPES.items()], default=0,
                                  blank=False, null=False)
    name = models.CharField(_('Theme name'), blank=False, null=False, max_length=500)
    preview = models.ImageField(_('Theme preview image'), upload_to='uploads/images/', blank=True)
    data = models.JSONField(_('Theme JSON data'), blank=True, null=True)


class Size(models.Model):
    order = models.IntegerField(_('Size position in themes list'), default=1, blank=False, null=False)
    height = models.PositiveIntegerField(_('Height'), blank=False, null=False)
    width = models.PositiveIntegerField(_('Width'), blank=False, null=False)


class Order(models.Model):
    STATUS_CREATED = 1
    STATUS_GENERATED = 2
    STATUS_ERROR = 2
    STATUSES = {
        STATUS_CREATED: _('Created'),
        STATUS_GENERATED: _('Generated'),
        STATUS_ERROR: _('Error')
    }

    status = models.IntegerField(_('Status'), choices=[(key, value) for key, value in STATUSES.items()],
                                 default=0, blank=False, null=False)
    date = models.DateTimeField(_('Date and time'), auto_now=True)
    data = models.JSONField(_('User map data'), blank=True, null=True)
