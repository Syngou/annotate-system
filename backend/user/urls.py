from django.urls import path

from . import views

urlpatterns = [
    # 接口地址按实际情况修改
    path('translate/', views.translate),
]
