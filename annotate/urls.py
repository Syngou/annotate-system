from django.urls import path
from . import views

urlpatterns = [
    path('translate/', views.translate_view),
    path('upload/', views.upload_view),
]
