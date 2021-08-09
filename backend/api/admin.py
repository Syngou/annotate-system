from django.contrib import admin
from .models import Labels, AnnotateText


@admin.register(Labels)
class LabelsAdmin(admin.ModelAdmin):
    list_display = ('id', 'text','color','shortcut','user_id')


@admin.register(AnnotateText)
class UploadTextAdmin(admin.ModelAdmin):
    list_display = ('id', 'text')
