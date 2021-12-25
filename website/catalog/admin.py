from django.contrib import admin
from django import forms
from django.http import HttpResponseRedirect
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, MapOrder, VectorImages, VectorColors
from .printer import print_map


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
    list_display = ('name', 'active', 'height', 'width', 'depth', 'height_px', 'width_px', 'scale')
    list_filter = ['active', ]
    search_fields = ['name', ]


admin.site.register(MapSize, MapSizeAdmin)


class MapPricesAdmin(admin.ModelAdmin):
    list_display = ('version', 'size', 'price')
    list_filter = ['version', 'price']


admin.site.register(MapPrices, MapPricesAdmin)


class MapVersionsAdmin(admin.ModelAdmin):
    list_display = ('name', 'active')
    list_filter = ['active', 'parent']
    search_fields = ['name', 'parent']


admin.site.register(MapVersions, MapVersionsAdmin)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'date', 'total_price', 'payment_status')
    list_filter = ['name', 'date', 'payment_status']


admin.site.register(Order, OrderAdmin)


class MapOrderAdmin(admin.ModelAdmin):
    change_form_template = "admin/map_order.html"

    list_display = ('date_created', 'price', 'status')
    list_filter = ['date_created']

    def response_change(self, request, obj):
        if "_generate_image" in request.POST:
            print_map(obj)
            self.message_user(request, "Image has been generated")
            return HttpResponseRedirect(".")
        return super().response_change(request, obj)


admin.site.register(MapOrder, MapOrderAdmin)

admin.site.register(VectorImages)
admin.site.register(VectorColors)
