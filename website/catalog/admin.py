from django.contrib import admin
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, MapOrder


class MapThemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'order', 'product')
    list_filter = ['active', 'product']
    search_fields = ['name', 'product']


admin.site.register(MapTheme, MapThemeAdmin)


class MapSizeAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'version', 'height', 'width', 'price')
    list_filter = ['active', 'version']
    search_fields = ['name', 'version']


admin.site.register(MapSize, MapSizeAdmin)


class MapPricesAdmin(admin.ModelAdmin):
    list_display = ('product', 'price')
    list_filter = ['product']


admin.site.register(MapPrices, MapPricesAdmin)


class MapVersionsAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'price', 'version')
    list_filter = ['active', 'version']
    search_fields = ['name', 'version']


admin.site.register(MapVersions, MapVersionsAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('date',)
    list_filter = ['date']


admin.site.register(Order, OrderAdmin)


admin.site.register(MapOrder)
