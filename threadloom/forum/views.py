from django.shortcuts import render, render_to_response
from forum.models.forum import User, Topic, TopicThread, Post, PostReply, FollowUser
from django.http import JsonResponse
from django.db.models.aggregates import Count
from forum.serializers import (
    TopicSerializer, TopicThreadSerializer, PostSerializer, PostReplySerializer
)
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
import uuid


def topics(request):
    topics = Topic.objects.all()
    topics_serialized = TopicSerializer(topics, many=True)
    return JsonResponse({'OK': 1, 'topics': topics_serialized.data})


def topic_threads(request):
    topic = request.GET.get('topic')
    if not topic:
        threads = TopicThread.objects.all()
    else:
        threads = TopicThread.objects.filter(id=topic)
    threads_serialized = TopicThreadSerializer(threads, many=True)
    return JsonResponse({'OK': 1, 'threads': threads_serialized.data})


@csrf_exempt
def posts(request):
    if request.method == 'POST':
        thread = request.POST.get('thread')
        email = request.POST.get('email')
        content = request.POST.get('content')
        user = User.objects.filter(email=email)
        if user:
            user = user[0]
        else:
            user = User(user_id=str(uuid.uuid4()), email=email)
            user.save()
        thread = TopicThread.objects.get(id=thread)

        Post(content=content, author=user, topic_thread=thread).save()
        return JsonResponse({'OK': 1})
    else:
        thread = request.GET.get('thread')
        # gets the posts and the replies for this post(s)
        if not thread:
            all_posts = Post.objects.all()
        else:
            thread = TopicThread(id=thread)
            all_posts = Post.objects.filter(topic_thread=thread)
        posts_serialized = PostSerializer(all_posts, many=True)
        return JsonResponse({'OK': 1, 'posts': posts_serialized.data})


@csrf_exempt
def add_reply(request):
    post_id = request.POST.get('post_id')
    content = request.POST.get('content')
    email = request.POST.get('email')
    user = User.objects.filter(email=email)
    if user:
        user = user[0]
    else:
        user = User(user_id=str(uuid.uuid4()), email=email)
        user.save()
    post = Post.objects.get(id=post_id)
    PostReply(post=post, author=user, content=content).save()
    return JsonResponse({'OK': 1})


def post_replies(request, post=None):
    if not post:
        all_posts = Post.objects.all()
    else:
        all_posts = Post.objects.filter(id=post)
    posts_serialized = PostSerializer(all_posts, many=True)
    return JsonResponse({'OK': 1, 'posts': posts_serialized.data})


@csrf_exempt
def follow(request):
    following_email = request.GET.get('following')
    follower_email = request.GET.get('follower')
    following = User.objects.get(email=following_email)
    follower = User.objects.get(email=follower_email)
    relation = FollowUser.objects.filter(follower=follower, following=following)
    if relation:
        return JsonResponse({'OK': 0})
    FollowUser(follower=follower, following=following).save()
    return JsonResponse({'OK': 1})


@csrf_exempt
def report(request):
    report_date = request.GET.get('report_date')
    report_date = datetime.strptime(report_date, '%Y-%m-%d')
    date_range = (
        datetime.combine(report_date, datetime.min.time()),
        datetime.combine(report_date, datetime.max.time())
    )
    total_posts = Post.objects.filter(create_time__range=date_range).count()
    top_poster = User.objects.annotate(num_posts=Count('post')).order_by('-num_posts')[0]
    return render_to_response(
        'report.html',
        context={
            'report_date': report_date.strftime('%Y-%m-%d'),
            'new_posts': total_posts,
            'top_poster': "%s with %s posts" % (top_poster.email, top_poster.num_posts)
        }
    )


def render_app(request):
    return render_to_response('forum.html')
