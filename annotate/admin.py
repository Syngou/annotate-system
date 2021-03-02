from django.contrib import admin
from annotate import models


# Register your models here.

class DataView(admin.ModelAdmin):
    list_display = ('relation', 'name', 'medicine', 'tool')


admin.site.register(models.AnnotateResult, DataView)
