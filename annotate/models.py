from django.db import models


class AnnotateResult(models.Model):
    relation = models.CharField(max_length=30)
    medicine = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    tool = models.CharField(max_length=30)
