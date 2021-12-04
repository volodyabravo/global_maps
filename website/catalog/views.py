from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import viewsets, mixins
from django.shortcuts import get_object_or_404

from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, VectorImages, VectorColors
from .serializers import MapThemeSerializer, MapSizeSerializer, MapPricesSerializer, MapVersionsSerializer,\
    VectorImagesSerializer, VectorColorsSerializer


class MapThemeView(viewsets.ModelViewSet):
    queryset = MapTheme.objects.filter(active=True).order_by('order')
    serializer_class = MapThemeSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = MapTheme.objects.filter(active=True).order_by('order')
        product = self.request.query_params.get('map_type', None)
        if product:
            queryset = queryset.filter(product=product)
        serializer = MapThemeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = MapTheme.objects.filter(active=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = MapThemeSerializer(_object)
        return Response(serializer.data)


class MapSizeView(viewsets.ModelViewSet):
    queryset = MapSize.objects.filter(active=True).order_by('order')
    serializer_class = MapSizeSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = MapSize.objects.filter(active=True).order_by('order')
        product = self.kwargs.get('product', None)
        if product:
            queryset = queryset.filter(product=product)
        serializer = MapSizeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = MapSize.objects.filter(active=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = MapSizeSerializer(_object)
        return Response(serializer.data)


class MapPricesView(viewsets.ModelViewSet):
    queryset = MapPrices.objects.all()
    serializer_class = MapPricesSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = MapPrices.objects.all()
        serializer = MapPricesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = MapPrices.objects.all()
        _object = get_object_or_404(queryset, pk=pk)
        serializer = MapPricesSerializer(_object)
        return Response(serializer.data)


class MapVersionsView(viewsets.ModelViewSet):
    queryset = MapVersions.objects.filter(active=True, parent__isnull=True).order_by('order')
    serializer_class = MapVersionsSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = MapVersions.objects.filter(active=True, parent__isnull=True).order_by('order')
        serializer = MapVersionsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = MapVersions.objects.filter(active=True, parent__isnull=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = MapVersionsSerializer(_object)
        return Response(serializer.data)


class VectorImagesView(viewsets.ModelViewSet):
    queryset = VectorImages.objects.filter(active=True).order_by('order')
    serializer_class = VectorImagesSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = VectorImages.objects.filter(active=True).order_by('order')
        serializer = VectorImagesSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = VectorImages.objects.filter(active=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = VectorImagesSerializer(_object)
        return Response(serializer.data)


class VectorColorsView(viewsets.ModelViewSet):
    queryset = VectorColors.objects.filter(active=True).order_by('order')
    serializer_class = VectorColorsSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = VectorColors.objects.filter(active=True).order_by('order')
        serializer = VectorColorsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = VectorColors.objects.filter(active=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = VectorColorsSerializer(_object)
        return Response(serializer.data)

