from django.contrib.auth.hashers import check_password, make_password
from django.db import models


#  用户数据
class Userdata(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to='avatar', max_length=255)
    roles = models.CharField(max_length=30, default="管理员")
    # labels = models.ManyToManyField(Labels, null=True)
    # upload_text = models.ForeignKey(Upload_text, null=True, on_delete=models.CASCADE)


# 标签模型
class Labels(models.Model):
    value = models.CharField(max_length=30)
    color = models.CharField(max_length=20, null=True)
    shortcut = models.CharField(max_length=5, null=True)
    user = models.ForeignKey(Userdata, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.value


# 用户上传的文件
class Upload_text(models.Model):
    upload_text = models.TextField(max_length=1000)
    user = models.ForeignKey(Userdata, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.upload_text


class Annotate_data(models.Model):
    # annotate_data = models.
    pass
