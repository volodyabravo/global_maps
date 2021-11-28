"""website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from catalog.views import MapThemeView, MapSizeView, MapPricesView, MapVersionsView, MapOrderView,\
    VectorImagesView, VectorColorsView
from catalog.delivery import get_cities, get_delivery_methods_by_city
from catalog.mail import send_mail_view

router = routers.DefaultRouter()
router.register(r'themes', MapThemeView)
router.register(r'sizes', MapSizeView)
router.register(r'prices', MapPricesView)
router.register(r'versions', MapVersionsView)
router.register(r'orders', MapOrderView)
router.register(r'vector_images', VectorImagesView)
router.register(r'vector_colors', VectorColorsView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/', include(router.urls)),
    path(r'api-auth/', include('rest_framework.urls')),
    path(r'api/delivery/get_cities/', get_cities, name="get_cities"),
    path(r'api/delivery/get_delivery_methods_by_city/', get_delivery_methods_by_city,
         name="get_delivery_methods_by_city"),
    # path(r'mail/', send_mail_view, name="mail")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
