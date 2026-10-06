# rest_api/urls.py

from django.urls import path,include
from .views import test_endpoint
from django.contrib import admin
from .views import getBuildingInsights,calculatePVprofit,UserRegistrationAPIView, UserLoginAPIView, logout_api,CheckoutAPIView,create_checkout_session, session_status
urlpatterns = [

    path('api/register/', UserRegistrationAPIView.as_view(), name='api_register'),
    path('api/login/', UserLoginAPIView.as_view(), name='api_login'),
    path('api/logout/', logout_api, name='api_logout'),
    path("api/stripe/", include("djstripe.urls", namespace="djstripe")), #add this
    path('api/checkout/', CheckoutAPIView.as_view(), name='checkout'), #add
    path('api/create-checkout-session', create_checkout_session, name='create-checkout-session'),
    path('api/session-status', session_status, name='session-status'),
    path('api/pv-profit', calculatePVprofit, name='pv-profit'),
    path('api/getBuldingInsights', getBuildingInsights, name='get-building-insights'),
]
