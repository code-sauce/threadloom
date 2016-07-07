"use strict";

var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _response = {};
var _topics = [];
var _threads = [];
var _posts = []; // posts for _selectedThread
var _selectedTopic = undefined;
var _selectedThread = undefined;

var ForumStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getSelectedTopic: function () {
        return _selectedTopic;
    },
    getSelectedThread: function () {
        return _selectedThread;
    },
    getTopics: function () {
        return _topics;
    },
    getThreads: function () {
        return _threads;
    },
    getPosts: function () {
        return _posts;
    },
    setSelectedTopic: function (topic_id) {
        _selectedTopic = topic_id;
        _posts = [];
        this.emitChange();
    },
    setSelectedThread: function (thread_id) {
        _selectedThread = thread_id;
        this.emitChange();
    }
});

AppDispatcher.register(function (action) {
    _response = action.response;
    switch (action.actionType) {
        case 'CHOSEN_TOPIC':
            _selectedTopic = _response;
            ForumStore.emitChange();
            break;
        case 'ADD_REPLY':
            ForumStore.emitChange();
            break;
        case 'ADD_POST':
            console.log('ADD_POST');
            ForumStore.emitChange();
            break;
        case 'GET_TOPICS':
            console.log('received...' + "GET_TOPICS");
            _topics = _response;
            ForumStore.emitChange();
            break;
        case 'GET_THREADS':
            console.log('received...' + "GET_THREADS");
            console.log(_response);
            _threads = _response;
            ForumStore.emitChange();
            break;
        case 'GET_POSTS':
            console.log('received...' + "GET_POSTS");
            console.log(_response);
            _posts = _response;
            ForumStore.emitChange();
            break;
        default:
            //do nothing
            break;
    }
});

module.exports = ForumStore;
