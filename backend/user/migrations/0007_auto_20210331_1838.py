# Generated by Django 3.1.7 on 2021-03-31 10:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_userdata_roles'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Annotate_data',
            new_name='AnnotateData',
        ),
        migrations.RenameModel(
            old_name='Upload_text',
            new_name='AnnotateText',
        ),
        migrations.RenameModel(
            old_name='Userdata',
            new_name='UserInfo',
        ),
    ]