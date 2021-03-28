from django.contrib import admin
from .models import Labels, Upload_text

@admin.register(Labels)
class LabelsAdmin(admin.ModelAdmin):
    list_display = ('id', 'label_name')


@admin.register(Upload_text)
class Upload_textAdmin(admin.ModelAdmin):
    list_display = ('id', 'upload_text')

