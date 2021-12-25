from rest_framework import routers, serializers, viewsets
from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, VectorImages, VectorColors


class MapThemeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapTheme
        fields = ['product', 'name', 'preview', 'data', 'id']


class MapPricesSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    size_id = serializers.CharField(source='size.id', read_only=True)
    version_id = serializers.CharField(source='version.id', read_only=True)

    class Meta:
        model = MapPrices
        fields = ['price', 'size_id', 'version_id', 'id']


class MapSizeSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = MapSize
        fields = ['name', 'height', 'width', 'depth', 'height_px', 'width_px', 'id']


class MapVersionsSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    sizes = MapSizeSerializer(read_only=True, many=True)
    children = serializers.SerializerMethodField(
        read_only=True, method_name="get_child_categories")

    class Meta:
        model = MapVersions
        fields = ['name', 'image', 'id', 'children', 'sizes']

    def get_child_categories(self, obj):
        """ self referral field """
        serializer = MapVersionsSerializer(
            instance=obj.mapversions_set.all(),
            many=True
        )
        return serializer.data


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
