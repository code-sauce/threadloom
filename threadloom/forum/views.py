from django.shortcuts import render, render_to_response
from forum.models.forum import User, Topic, TopicThread, Post, PostReply
from django.http import JsonResponse
from forum.serializers import (
    TopicSerializer, TopicThreadSerializer, PostSerializer, PostReplySerializer
)


def topics(request):
    topics = Topic.objects.all()
    topics_serialized = TopicSerializer(topics, many=True)
    return JsonResponse({'OK': 1, 'topics': topics_serialized.data})


def topic_threads(request, topic=None):
    if not topic:
        threads = TopicThread.objects.all()
    else:
        threads = TopicThread.objects.filter(id=topic)
    threads_serialized = TopicThreadSerializer(threads, many=True)
    return JsonResponse({'OK': 1, 'threads': threads_serialized.data})


def posts(request, thread=None):
    # gets the posts and the replies for this post(s)
    if not thread:
        all_posts = Post.objects.all()
    else:
        all_posts = Post.objects.filter(id=thread)
    posts_serialized = PostSerializer(all_posts, many=True)
    return JsonResponse({'OK': 1, 'posts': posts_serialized.data})


def post_replies(request, post=None):
    if not post:
        all_posts = Post.objects.all()
    else:
        all_posts = Post.objects.filter(id=post)
    posts_serialized = PostSerializer(all_posts, many=True)
    return JsonResponse({'OK': 1, 'posts': posts_serialized.data})


# TODO
# 1. create view to create a thread for a topic thread
# 2. create a reply for a given post
# 3. follow a user
