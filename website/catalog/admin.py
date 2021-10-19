from django.contrib import admin
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, MapOrder

admin.site.register(MapTheme)
admin.site.register(MapSize)
admin.site.register(MapPrices)
admin.site.register(MapVersions)
admin.site.register(Order)
admin.site.register(MapOrder)
