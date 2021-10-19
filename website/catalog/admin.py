from django.contrib import admin
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, MapOrder


class MapThemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'order', 'product')
    list_filter = ['active', 'product']
    search_fields = ['name', 'product']


admin.site.register(MapTheme, MapThemeAdmin)
admin.site.register(MapSize)
admin.site.register(MapPrices)
admin.site.register(MapVersions)
admin.site.register(Order)
admin.site.register(MapOrder)
