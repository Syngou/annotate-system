from django.contrib import admin
from .models import Labels, AnnotateText


@admin.register(Labels)
class LabelsAdmin(admin.ModelAdmin):
    list_display = ('id', 'value')


@admin.register(AnnotateText)
class UploadTextAdmin(admin.ModelAdmin):
    list_display = ('id', 'upload_text')
