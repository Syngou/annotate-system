import json

import requests
from django.contrib.auth.hashers import check_password, make_password
from django.core import signing
from utils.response import error, ok
from utils.translate_config import header, keydata

from .models import *


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


# # 用户注册信息上传接口
# class ImageUploadSerializer(serializers.Serializer):
#     token = serializers.CharField(max_length=100)
#     image = serializers.ImageField()

# @csrf_exempt
# def userdata_upload(self, request, *args, **kwargs):
#     username = request.POST.get['username']
#     password = make_password(requset.POST.get['password']) #加密

#     portrait = request.FILES['image']
#     data = get_parameter_dic(request)
#     # 需要判断文件类型是否是图片.
#     serial = ImageUploadSerializer(data={"token": data["token"],
#                                             "image": portrait})
#     if serial.is_valid():
#         print("校验成功")
#     else:
#         return JsonError("参数校验失败")

#     portrait = serial.validated_data.get("image")

#     newuser = Userdata(username=username, password=password, portrait=portrait)
#     newuser.save()

#     return JsonResponse(data=newuser)

# # 用户自定义标签存储接口(登录之后才可调用)
# def addlabels(request):
#     user = request.GET.get('username') #这里需要获取当前登录的用户是谁(你应该搞得定)
#     value = request.POST.get('value')  #这里用POST还是GET你自己灵活修改吧
#     color = request.POST.get('color')
#     shortcut = request.POST.get('shortcut')
#     newlabel = Labels(value=value, color=color, shortcut=shortcut, user=user)
#     newlabel.save()


# # 导入文本数据
def file_upload(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    print(request)
    file = request.FILES.get("file")
    print(file)
    newFile = Upload_text(upload_text=file)
    # newfile = Upload_text(upload_text=file, user=user) 搞定上面之后就改成这句，绑定用户
    newFile.save()
    return ok({'fileUpload': "yes"})


# 登录
def login(request):
    data = json.loads(request.body)

    username = data['username']
    password = data['password']
    print(username, password)

    if username == "Syngou" and password == "111111":
        token = signing.dumps({"username": "Syngou"})
        print(token)
        return ok({"token": token})

    else:
        return error("用户名或密码错误")


# 用户注册
def register(request):
    data = json.loads(request.body)
    username = data['username']
    password = data['password']
    if len(password) <= 8:
        return error("密码长度不能小于8位数")
    token = signing.dumps({"username": username})
    return ok({"token": token})


# 获取用户信息
def get_user_info(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    # 在这里顺便查询数据库，获取用户自定义的标注分类，标注文本，并放入响应数据中
    # 这里有些信息是不必要的，比如说 手机号码 ，介绍 等，我这里只是举例而已
    return ok({
        "name": username,
        "account": 182,
        "roles": ["管理员"],  # 用户角色，如果有用户管理就需要
        "introduction": "我是超级管理员",  # 介绍
        "avatar":
        "https://w.wallhaven.cc/full/nr/wallhaven-nrjgy7.jpg",  # 头像地址
        "institution": "xx单位",
        "phone": "18888888888",
    })


# 注销
def logout(request):
    print(request)
    return ok({})


# 设置用户头像
def set_avatar(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    avatar = request.FILES.get("avatar")
    print(avatar)
    user = Userdata.objects.filter(username=username)
    if user:
        user.update(avatar=avatar)
    else:
        userdata = Userdata(username=username, avatar=avatar)
        userdata.save()
    # 返回头像的链接地址
    return ok({"avatar": "http://localhost:8000/media/avatar/" + avatar.name})


# 设置标注分类
def set_labels(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    data = json.loads(request.body)
    print(data)
    # 返回设置好的标注分类
    return ok([
        {
            "value": "药物",
            "color": "#fa0404",
            "shortcut": "m"
        },
    ])


# 设置标注文本
def set_annotate_text(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    data = json.loads(request.body)
    print(data)
    # 返回标注文本信息
    return ok([{"text": "text1", "user": "user1"}])
