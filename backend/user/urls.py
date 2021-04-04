from django.urls import path

from . import views

urlpatterns = [
    # 接口地址按实际情况修改
    path('translate/', views.translate),  # 翻译
    path('annotate_text/upload/', views.import_annotate_text),  # 上传标注文本
    path('login/', views.login),  # 用户登录
    path('register/', views.register),  # 用户注册
    path("getUserInfo/", views.get_user_info),  # 获取用户信息
    path('logout/', views.logout),  # 注销
    path('setAvatar/', views.set_avatar),  # 用户头像上传
    path('setClassification/', views.add_labels),  # 设置分类
    path("setAnnotateText/", views.set_annotate_text),  # 设置
    path('annotateDataUpload/', views.annotate_data_upload),  # 标注数据上传
    path('addMember/', views.add_member),  # 添加成员
    path('info/update/', views.user_info_update)  # 用户信息更新
]
