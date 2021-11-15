from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import viewsets, mixins
from django.shortcuts import get_object_or_404

from .models import MapTheme, MapSize, MapPrices, MapVersions, Order, DeliveryType
from .serializers import MapThemeSerializer, MapSizeSerializer, MapPricesSerializer, MapVersionsSerializer,\
    OrderSerializer, DeliveryTypeSerializer


class MapThemeView(viewsets.ModelViewSet):
    queryset = MapTheme.objects.filter(active=True).order_by('order')
    serializer_class = MapThemeSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = MapTheme.objects.filter(active=True).order_by('order')
        product = self.kwargs.get('product', None)
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
    queryset = MapVersions.objects.filter(active=True).order_by('order')
    serializer_class = MapVersionsSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = MapVersions.objects.filter(active=True).order_by('order')
        serializer = MapVersionsSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = MapVersions.objects.filter(active=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = MapVersionsSerializer(_object)
        return Response(serializer.data)


class MapOrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    http_method_names = ['post', ]


class DeliveryTypeView(viewsets.ModelViewSet):
    queryset = DeliveryType.objects.filter(active=True).order_by('order')
    serializer_class = DeliveryTypeSerializer
    http_method_names = ['get', ]

    def list(self, request, *args, **kwargs):
        queryset = DeliveryType.objects.filter(active=True).order_by('order')
        serializer = DeliveryTypeSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = DeliveryType.objects.filter(active=True).order_by('order')
        _object = get_object_or_404(queryset, pk=pk)
        serializer = DeliveryTypeSerializer(_object)
        return Response(serializer.data)

