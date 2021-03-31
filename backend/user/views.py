import json
import os

import requests
from django.contrib.auth.hashers import check_password, make_password
from django.core import signing

from .models import *
from .utils import error, header, keydata, ok


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
    user = Userdata.objects.filter(username=username, password=password)
    if user:
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
    if len(password) < 6:
        return error("密码长度不能小于6位数")
    if Userdata.objects.filter(username=username):
        return error("这个昵称太受欢迎了，请换另一个昵称")
    user = Userdata(username=username, password=password)
    user.save()
    token = signing.dumps({"username": username})
    return ok({"token": token})


# 获取用户信息
def get_user_info(request):
    token = signing.loads((request.META.get('HTTP_ANNOTATE_SYSTEM_TOKEN')))
    username = token['username']
    user = Userdata.objects.get(username=username)
    # 在这里顺便查询数据库，获取用户自定义的标注分类，标注文本，并放入响应数据中
    if not user:
        return error("用户信息不存在")
    userAvatar = "http://localhost:8000/media/avatar/" + str(user.avatar) if user.avatar else None
    return ok({
        "name":
            username,
        "roles": [user.roles],  # 用户角色，如果有用户管理就需要
        "avatar": userAvatar,  # 头像地址
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
    user = Userdata.objects.filter(username=username)
    if user:
        user.update(avatar=avatar)
        with open(os.path.join(os.getcwd(), 'upload_file/avatar', avatar.name),
                  'wb') as fw:
            fw.write(avatar.read())
    else:
        userdata = Userdata(username=username, avatar=avatar)
        userdata.save()
    # 返回头像的链接地址
    return ok({"avatar": "http://localhost:8000/media/avatar/" + avatar.name})


# 更新用户信息
def user_info_update(request):
    return ok({})


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
