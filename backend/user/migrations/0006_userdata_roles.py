# Generated by Django 3.1.7 on 2021-03-30 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_auto_20210330_1912'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='roles',
            field=models.CharField(default='管理员', max_length=30),
        ),
    ]
