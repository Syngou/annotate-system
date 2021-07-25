from django.contrib.auth.hashers import check_password, make_password
from django.db import models


#  用户信息
class UserInfo(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to='avatar', max_length=255)
    roles = models.CharField(max_length=30, default="管理员")
    # labels = models.ManyToManyField(Labels, null=True)
    # text = models.ForeignKey(Upload_text, null=True, on_delete=models.CASCADE)


# 用户自定义的标签
class Labels(models.Model):
    value = models.CharField(max_length=30)
    color = models.CharField(max_length=20, null=True)
    shortcut = models.CharField(max_length=5, null=True)
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.value

'''
 用户上传的文本
 使用用户的id作为外键 主要作用就是查找该用户所有的标注文本, 以及在其注销账号时, 删除所有数据时用
 其他的情况, 如更改, 删除每一条数据都可以直接使用 id
'''
class AnnotateText(models.Model):
    text = models.TextField(max_length=1000)
    description = models.TextField(max_length=1000,default="无")
    status = models.CharField(max_length=20,default="未标注")
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.text


# 标注数据
class AnnotateData(models.Model):
    # annotate_data = models.
    pass
