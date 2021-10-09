from django.contrib import admin
from .models import MapTheme, MapSize, MapPrices, MapVersions, MapOrder

admin.site.register(MapTheme)
admin.site.register(MapSize)
admin.site.register(MapPrices)
admin.site.register(MapVersions)
admin.site.register(MapOrder)
