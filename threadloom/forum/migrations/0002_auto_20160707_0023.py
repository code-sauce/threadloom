# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-07 00:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.CharField(max_length=40),
        ),
    ]
