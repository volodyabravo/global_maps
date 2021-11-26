from rest_framework import routers, serializers, viewsets
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, VectorImages, VectorColors


class MapThemeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapTheme
        fields = ['product', 'name', 'preview', 'data', 'id']


class MapSizeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapSize
        fields = ['name', 'height', 'width', 'depth', 'height_px', 'width_px', 'id']


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


class VectorImagesSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = VectorImages
        fields = ['image', 'id']


class VectorColorsSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = VectorColors
        fields = ['color_background', 'color_vector', 'color_text', 'id']
