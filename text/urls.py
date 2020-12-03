'''
Author: Syngou
Date: 2020-11-13 16:32:36
LastEditTime: 2020-12-01 12:58:17
Description: 路由
LastEditor: Syngou
'''
from django.contrib import admin
from django.urls import path
from django.views.generic.base import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
]
