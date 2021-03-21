from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # 标注页面api
    path('', include('annotate.urls')),
    # 错误分析
    path('error_analysis/', include('errorAnalysis.urls'))
]
