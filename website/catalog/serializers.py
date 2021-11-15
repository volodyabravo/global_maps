from rest_framework import routers, serializers, viewsets
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, DeliveryType


class MapThemeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapTheme
        fields = ['product', 'name', 'preview', 'data', 'id']


class MapSizeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    version_id = serializers.CharField(source='version.id', read_only=True)

    class Meta:
        model = MapSize
        fields = ['version_id', 'name', 'height', 'width', 'id']


class MapPricesSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    size_id = serializers.CharField(source='size.id', read_only=True)
    version_id = serializers.CharField(source='version.id', read_only=True)

    class Meta:
        model = MapPrices
        fields = ['price', 'size_id', 'version_id', 'id']


class MapVersionsSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    parent_id = serializers.CharField(source='parent.id', read_only=True)

    class Meta:
        model = MapVersions
        fields = ['parent_id', 'name', 'image', 'id']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['card_data', 'name', 'surname', 'phone', 'email', 'country', 'city', 'address', 'delivery_type']


class DeliveryTypeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = DeliveryType
        fields = ['name', 'description', 'price', 'id']
