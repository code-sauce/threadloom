from rest_framework import serializers
from forum.models.forum import User, Topic, TopicThread, Post, PostReply


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'first_name', 'last_name', 'email')


class TopicSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    title = serializers.CharField()

    class Meta:
        model = Topic
        fields = ('id', 'title', 'creator', 'create_time', 'mod_time')


class TopicThreadSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    title = serializers.CharField()
    topic = TopicSerializer()

    class Meta:
        model = TopicThread
        fields = ('id', 'title', 'creator', 'topic', 'create_time', 'mod_time')


class PostReplySerializerNoRelated(serializers.ModelSerializer):
    content = serializers.CharField()
    author = UserSerializer()

    class Meta:
        model = PostReply
        fields = ('id', 'content', 'author', 'create_time', 'mod_time')


class PostSerializer(serializers.ModelSerializer):
    content = serializers.CharField()
    author = UserSerializer()
    topic_thread = TopicThreadSerializer()
    replies = PostReplySerializerNoRelated(many=True)

    class Meta:
        model = Post
        fields = ('id', 'content', 'author', 'topic_thread', 'replies', 'create_time', 'mod_time')


class PostReplySerializer(serializers.ModelSerializer):
    content = serializers.CharField()
    author = UserSerializer()
    post = PostSerializer()

    class Meta:
        model = PostReply
        fields = ('id', 'content', 'author', 'post',  'create_time', 'mod_time')
