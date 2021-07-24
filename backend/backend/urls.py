from django.contrib import admin
from django.urls import include, path, re_path
from django.views import static

from .settings import MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    # 标注页面api
    path('user/', include('user.urls')),
    # 错误分析
    path('error_analysis/', include('errorAnalysis.urls')),
    # 媒体资源, 静态文件
    re_path(r'^media/(?P<path>.*)$',
            static.serve, {'document_root': MEDIA_ROOT},
            name='static')
]
