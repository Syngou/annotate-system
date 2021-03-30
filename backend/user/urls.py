from django.urls import path

from . import views

urlpatterns = [
    # 接口地址按实际情况修改
    path('translate/', views.translate),
    path('annotate_text/upload/', views.file_upload),
    path('login/', views.login),
    path('register/', views.register),
    path("getUserInfo/", views.get_user_info),
    path('logout/', views.logout),
    path('setAvatar/', views.set_avatar)
]
