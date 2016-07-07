"use strict";
/*eslint camelcase: [2, {properties: "never"}]*/
var AppDispatcher = require('../dispatcher/app_dispatcher');

var ForumActions = {
    getTopics: function () {
        var status = {};
        var response = {};
        $.ajax({
            url: "/topics",
            data: {},
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                AppDispatcher.dispatch({
                    actionType: 'GET_TOPICS',
                    response: data.topics
                });

            },
            error: function (xhr, textStatus, thrownError) {
            },
        });
    },

    getThreads: function(selectedTopic) {
        console.log('getting threads for topic: ' + selectedTopic);
        if (!selectedTopic) {
            AppDispatcher.dispatch({
                actionType: 'GET_THREADS',
                response: []
            });
            return undefined;
        }
        $.ajax({
            url: "/threads?topic=" + selectedTopic,
            data: {},
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                console.log('threads. selected topic: ' + selectedTopic);
                console.log(data);
                AppDispatcher.dispatch({
                    actionType: 'GET_THREADS',
                    response: data.threads
                });

            },
            error: function (xhr, textStatus, thrownError) {
            },
        });
    },

    getPosts: function(selectedTopicThread) {
        console.log('getting posts for thread: ' + selectedTopicThread);
        if (!selectedTopicThread) {
            AppDispatcher.dispatch({
                actionType: 'GET_POSTS',
                response: []
            });
            return undefined;
        }
        $.ajax({
            url: "/posts?thread=" + selectedTopicThread,
            data: {},
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                console.log('posts. selected thread: ' + selectedTopicThread);
                console.log(data);
                AppDispatcher.dispatch({
                    actionType: 'GET_POSTS',
                    response: data.posts
                });

            },
            error: function (xhr, textStatus, thrownError) {
            },
        });
    },

    addReply: function(thread_id, post_id, content, email) {
        var status = {};
        var response = {};
        $.ajax({
            url: "/reply/",
            data: {content: content, post_id: post_id, email: email},
            dataType: 'JSON',
            type: 'POST',
            success: function (data) {
                console.log('saved reply');
                console.log(data);
                AppDispatcher.dispatch({
                    actionType: 'ADD_REPLY',
                    response: []
                });

                ForumActions.getPosts(thread_id);
            },
            error: function (xhr, textStatus, thrownError) {
            },
        });
    },

    addPost: function(thread_id, content, email) {
        var status = {};
        var response = {};
        $.ajax({
            url: "/posts/",
            data: {content: content, thread: thread_id, email: email},
            dataType: 'JSON',
            type: 'POST',
            success: function (data) {
                console.log('saved post');
                console.log(data);
                AppDispatcher.dispatch({
                    actionType: 'ADD_POST',
                    response: []
                });
                ForumActions.getPosts(thread_id);
            },
            error: function (xhr, textStatus, thrownError) {
            },
        });
    },


};

module.exports = ForumActions;
