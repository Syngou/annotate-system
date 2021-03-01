from django.db import models


class AnnotateResult(models.Model):
    # 暂时这么设计，可按实际情况修改
    relation = models.CharField(max_length=30)
    medicine = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    tool = models.CharField(max_length=30)
