from rest_framework import serializers
from forum.models.forum import User, Topic, TopicThread


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'first_name', 'last_name', 'email')


class TopicSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    title = serializers.CharField()

    class Meta:
        model = Topic
        fields = ('title', 'creator', 'create_time', 'mod_time')


class TopicThreadSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    title = serializers.CharField()
    topic = TopicSerializer()

    class Meta:
        model = TopicThread
        fields = ('title', 'creator', 'topic', 'create_time', 'mod_time')
