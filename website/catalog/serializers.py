from rest_framework import routers, serializers, viewsets
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order


class MapThemeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MapTheme
        fields = ['product', 'name', 'preview', 'data']


class MapSizeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MapSize
        fields = ['version', 'price', 'name', 'height', 'width']


class MapPricesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MapPrices
        fields = ['price', 'product']


class MapVersionsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MapVersions
        fields = ['version', 'price', 'name', 'image']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['data']
