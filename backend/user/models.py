from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# # 用户数据
class Userdata(models.Model):
    username = models.CharField(max_length=30 ,unique=True)
    password = models.CharField(max_length=20)
    portrait = models.ImageField(upload_to='portraits', max_length=255)
    labels = models.ManyToManyField(Labels)
    upload_text = models.ForeignKey(Upload_text)


# 标签模型
class Labels(models.Model):
    label_name = models.CharField(max_length=30)
    
    def __str__(self):
        return self.label_name


class Upload_text(models.Model):
    upload_text = models.TextField(max_length=1000)

    def __str__(self):
        return self.upload_text

class Annotate_data(models.Model):
    # annotate_data = models.
    pass
