# Generated by Django 3.1.7 on 2021-08-09 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='labels',
            old_name='value',
            new_name='text',
        ),
    ]
