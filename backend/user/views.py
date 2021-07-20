import json
import os

import requests
from chardet import detect
from conllu.parser import serialize
from django.contrib.auth.hashers import check_password, make_password
from django.core import signing, serializers

from .models import *
from .utils import *

'''
目前是把几乎所有的接口都放在这
但是为了方便管理和维护，以及更好的逻辑
可以多弄几个app 使每个app的功能更加细化
当然要记得同时更改前端请求的地址
'''


# 登录 登录后会在浏览器存储cookie,并且有时长
def login(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    user = UserInfo.objects.filter(username=username)
    if user and check_password(password, user[0].password):
        token = signing.dumps({"username": username, "id": user[0].id})
        return ok({"token": token})
    else:
        return error("用户名或密码错误，请仔细检查后重新输入")


# 用户注册
def register(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    if UserInfo.objects.filter(username=username):
        return error("这个昵称太受欢迎了，请换另一个昵称")
    password = make_password(password)  # 密码加密后再存储
    user = UserInfo(username=username, password=password)
    user.save()
    token = signing.dumps({"username": username, "id": user.id})
    return ok({"token": token})


# 获取用户信息
def get_user_info(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    user = UserInfo.objects.filter(username=username)
    # 在这里顺便查询数据库，获取用户自定义的标注分类，标注文本，成员信息 并放入响应数据中
    if not user:
        return error("用户信息不存在")
    annotate_text_list = serializers.serialize("json", AnnotateText.objects.filter(user_id=user[0].id))
    print(annotate_text_list)
    userAvatar = str(request.build_absolute_uri('/')) + "media/avatar/" + str(
        user[0].avatar) if user[0].avatar else None
    return ok({
        "name": username,
        "roles": [user[0].roles],  # 用户角色，如果有用户管理就需要
        "avatar": userAvatar,  # 头像地址
        "annotate_text_list": annotate_text_list
    })


# 注销 用户注销后，前端会删除浏览器的cookie,同时会请求这个接口
# 如果有其他业务逻辑的话，可以在这里进行操作，没有的话就不用管他了
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
    return ok({
        "avatar":
            str(request.build_absolute_uri('/')) + "media/avatar/" + avatar.name
    })


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
    user_id = token['id']
    file = request.FILES.get("file")
    # 把上传文件的每一行作为一条数据存入数据库
    arr = []
    for line in file.readlines():
        line_content = line.decode("utf-8").strip()
        # 返回的数据集, 如果有更简单的方法可以改
        # 这里只有文本信息,还应有 标注者(可能有多个标注者参与), 标注状态(是否已经标注), 描述(非必要) 等信息
        arr.append(line_content)
        newFile = AnnotateText(upload_text=line_content, user_id=user_id)
        newFile.save()
    # 返回上传的数据集
    return ok(arr)


# 设置标注文本
def set_annotate_text(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
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


# 添加标注分类
def add_labels(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    data = json.loads(request.body)
    for i in data:
        print(i)
    # 返回设置好的标注分类
    return ok({})


# 编辑标注分类
def edit_labels(request):
    return ok({})


# 删除标注分类
def delete_labels(request):
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
