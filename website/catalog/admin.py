from django.contrib import admin
from django import forms
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, MapOrder


class MapThemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'order', 'product')
    list_filter = ['active', 'product']
    search_fields = ['name', 'product']


admin.site.register(MapTheme, MapThemeAdmin)


class MapSizeForm(forms.ModelForm):
    def clean(self):
        height = self.cleaned_data['height']
        width = self.cleaned_data['width']
        height_px = self.cleaned_data['height_px']
        width_px = self.cleaned_data['width_px']
        if height / width != height_px / width_px:
            raise forms.ValidationError({'height': "Different h/w ratio in centimeter and pixel fields"})


class MapSizeAdmin(admin.ModelAdmin):
    form = MapSizeForm
    list_display = ('name', 'active', 'version', 'height', 'width', 'height_px', 'width_px', 'scale')
    list_filter = ['active', 'version']
    search_fields = ['name', 'version']


admin.site.register(MapSize, MapSizeAdmin)


class MapPricesAdmin(admin.ModelAdmin):
    list_display = ('version', 'size', 'price')
    list_filter = ['version', 'price']


admin.site.register(MapPrices, MapPricesAdmin)


class MapVersionsAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'version')
    list_filter = ['active', 'version']
    search_fields = ['name', 'version']


admin.site.register(MapVersions, MapVersionsAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('date',)
    list_filter = ['date']


admin.site.register(Order, OrderAdmin)


class MapOrderAdmin(admin.ModelAdmin):
    list_display = ('date', 'order', 'status')
    list_filter = ['date']


admin.site.register(MapOrder, MapOrderAdmin)
