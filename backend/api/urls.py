from django.urls import path

from . import views
# 接口地址按实际情况修改
urlpatterns = [
    # 用户信息
    path('login/', views.login),  # 用户登录
    path('logout/', views.logout),  # 注销
    path('register/', views.register),  # 用户注册
    path("getUserInfo/", views.get_user_info),  # 获取用户信息
    path('info/update/', views.user_info_update),  # 更新用户信息
    path('setAvatar/', views.set_avatar),  # 上传用户头像

    # 标注文本
    path('annotate_text/upload/', views.import_annotate_text),  # 上传标注文本
    path('annotate_text/delete/', views.delete_annotate_text),  # 删除标注文本(一条)
    path('annotate_text/edit/', views.update_annotate_text_info),  # 更新标注文本信息

    # 标签管理
    path('labels/add/', views.add_labels),  # 添加标签
    path('labels/get/', views.get_labels),  # 获取标签

    # 标注数据
    path('annotateDataUpload/', views.annotate_data_upload),  # 上传标注数据

    # 成员管理
    path('addMember/', views.add_member),  # 添加成员

    # 其他
    path('translate/', views.translate),  # 翻译
    path('error_analysis/', views.error_analysis_file_upload)  # 错误分析
]
