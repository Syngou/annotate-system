from django.urls import path

from . import views

urlpatterns = [
    # 接口地址按实际情况修改
    path('translate/', views.translate),
    path('upload/', views.annotate_data_upload),
    path('error_analysis/file_upload/', views.error_analysis_file_upload),
]
