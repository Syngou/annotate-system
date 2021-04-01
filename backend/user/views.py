import json
import os

import requests
from django.contrib.auth.hashers import check_password, make_password
from django.core import signing

from .models import *
from .utils import *


# 登录
def login(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    user = UserInfo.objects.get(username=username)
    if user and check_password(password, user.password):
        token = signing.dumps({"username": username, "id": user.id})
        return ok({"token": token})
    else:
        return error("用户名或密码错误")


# 用户注册
def register(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    if len(password) < 6:
        return error("密码长度不能小于6位数")
    if UserInfo.objects.filter(username=username):
        return error("这个昵称太受欢迎了，请换另一个昵称")
    password = make_password(password)
    user = UserInfo(username=username, password=password)
    user.save()
    token = signing.dumps({"username": username, "id": user.id})
    return ok({"token": token})


# 获取用户信息
def get_user_info(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    user = UserInfo.objects.get(username=username)
    # 在这里顺便查询数据库，获取用户自定义的标注分类，标注文本，成员信息 并放入响应数据中
    if not user:
        return error("用户信息不存在")
    userAvatar = str(request.build_absolute_uri('/')) + "media/avatar/" + str(
        user.avatar) if user.avatar else None
    return ok({
        "name": username,
        "roles": [user.roles],  # 用户角色，如果有用户管理就需要
        "avatar": userAvatar,  # 头像地址
    })


# 注销
def logout(request):
    return ok({})


# 设置用户头像
def set_avatar(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    # 是否需要限制头像大小
    avatar = request.FILES.get("avatar")
    # 更新头像前应该把旧头像删除
    # 为了防止头像被覆盖，即不同用户上传的头像名称相同，应考虑存储图片时图片的命名
    UserInfo.objects.filter(username=username).update(avatar=avatar)
    with open(os.path.join(os.getcwd(), 'upload_file/avatar', avatar.name),
              'wb') as fw:
        fw.write(avatar.read())
    # 返回头像的链接地址
    return ok({"avatar": str(request.build_absolute_uri('/')) + "media/avatar/" + avatar.name})


# 更新用户信息
def user_info_update(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    data = json.loads(request.body)
    # 这里只更新用户名，想要更新其他的可以添加
    name = data['name']
    userId = token['id']
    if UserInfo.objects.filter(username=name):
        return error("这个昵称太受欢迎了，请换另一个")
    UserInfo.objects.filter(id=userId).update(username=name)
    token = signing.dumps({"username": name, "id": userId})
    return ok({"token": token})


# 设置标注分类
def set_labels(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    data = json.loads(request.body)
    for i in data:
        print(i)
    # 返回设置好的标注分类
    return ok([
        {
            "value": "药物",
            "color": "#fa0404",
            "shortcut": "m"
        },
    ])


# 翻译接口
def translate(request):
    text = request.GET.get('text')
    # 请求的有道url
    url = 'http://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule'

    response = requests.request("POST",
                                url,
                                headers=header(),
                                data=keydata(text))
    result = response.json().get("translateResult")[0][0].get("tgt")
    return ok({'result': result})


# 导入文本
def import_annotate_text(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    print(request)
    file = request.FILES.get("file")
    print(file)
    newFile = AnnotateText(upload_text=file)
    # newfile = Upload_text(upload_text=file, user=user) 搞定上面之后就改成这句，绑定用户
    newFile.save()
    return ok({'fileUpload': "yes"})


# 设置标注文本
def set_annotate_text(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    data = json.loads(request.body)
    print(data)
    # 返回标注文本信息
    return ok([{"text": "text1", "user": "user1"}])


# 删除标注文本
def delete_annotate_text(request):
    return ok({})


# 编辑标注文本
def edit_annotate_text(request):
    return ok({})


# 添加成员
def add_member(request):
    return ok({})


# 删除成员
def delete_member(request):
    return ok({})


# 编辑成员信息
def edit_member_info(request):
    return ok({})


# 导出数据接口
def export_annotate_data(request):
    return ok({})


# 标注数据上传
def annotate_data_upload(request):
    data = json.loads(request.body)
    for k, v in data.items():
        print(k, ' = ', v)
    return ok({})
