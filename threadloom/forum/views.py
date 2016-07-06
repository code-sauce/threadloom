from django.shortcuts import render, render_to_response
from forum.models.forum import User, Topic, TopicThread
from django.http import JsonResponse
from forum.serializers import TopicSerializer, TopicThreadSerializer


def topics(request):
    topics = Topic.objects.all()
    topics_serialized = TopicSerializer(topics, many=True)
    return JsonResponse({'OK': 1, 'topics': topics_serialized.data})


def topic_threads(request):
    threads = TopicThread.objects.all()
    threads_serialized = TopicThreadSerializer(threads, many=True)
    return JsonResponse({'OK': 1, 'threads': threads_serialized.data})

