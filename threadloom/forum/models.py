from __future__ import unicode_literals

from django.db import models


# Create your models here.
class BaseModel(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    mod_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        app_label = ''


class User(BaseModel):
    user_id = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.EmailField()


class Topic(BaseModel):
    creator = models.ForeignKey(User)
    title = models.CharField(max_length=400)


class TopicThread(BaseModel):
    creator = models.ForeignKey(User)
    title = models.CharField(max_length=400)
    topic = models.ForeignKey(Topic)


class Post(BaseModel):
    content = models.TextField()
    author = models.ForeignKey(User)
    topic_thread = models.ForeignKey(TopicThread)


class PostReply(BaseModel):
    content = models.TextField()
    author = models.ForeignKey(User)
    post = models.ForeignKey(Post)


class FollowUser(BaseModel):
    follower = models.ForeignKey(User)
    following = models.ForeignKey(User)
