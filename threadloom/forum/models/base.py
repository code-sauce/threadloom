from django.db import models, transaction, connection
from django.core import serializers


class BaseModel(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    mod_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        app_label = 'forum'
