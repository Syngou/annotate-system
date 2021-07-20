from django.contrib.auth.hashers import check_password, make_password
from django.db import models


#  用户信息
class UserInfo(models.Model):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to='avatar', max_length=255)
    roles = models.CharField(max_length=30, default="管理员")
    # labels = models.ManyToManyField(Labels, null=True)
    # upload_text = models.ForeignKey(Upload_text, null=True, on_delete=models.CASCADE)


# 用户自定义的标签
class Labels(models.Model):
    value = models.CharField(max_length=30)
    color = models.CharField(max_length=20, null=True)
    shortcut = models.CharField(max_length=5, null=True)
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.value


# 用户上传的文本
# 使用用户的id作为外键 即可
# 还需要添加 描述 状态(是否已经标注) 列
class AnnotateText(models.Model):
    upload_text = models.TextField(max_length=1000)
    user = models.ForeignKey(UserInfo, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.upload_text


# 标注数据
class AnnotateData(models.Model):
    # annotate_data = models.
    pass
