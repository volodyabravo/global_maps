from rest_framework import routers, serializers, viewsets
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order


class MapThemeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapTheme
        fields = ['product', 'name', 'preview', 'data', 'id']


class MapSizeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapSize
        fields = ['version', 'price', 'name', 'height', 'width', 'id']


class MapPricesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MapPrices
        fields = ['price', 'product']


class MapVersionsSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapVersions
        fields = ['version', 'price', 'name', 'image', 'id']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['data']
