"use strict";
var React = require('react');
var ForumStore = require('../stores/forum');
var ForumAction = require('../actions/forum');
var Post = require('../components/post');

function getStateFromStores() {
    console.log('getStateFromStores');
    return {
        threads: ForumStore.getThreads(),
        selectedThread: ForumStore.getSelectedThread()
    };
}

var initialState = {
    threads: [],
    selectedThread: undefined
};

var TopicThread = React.createClass({
    getInitialState: function () {
        ForumAction.getThreads(this.props.selectedTopic);
        return initialState;
    },
    // Add change listeners to stores
    componentDidMount: function () {
        console.log('componentDidMount');
        ForumStore.addChangeListener(this._onChange);
    },
    componentWillMount: function () {
        ForumStore.addChangeListener(this._onChange);
        this.setState(initialState);
    },
    componentWillUnmount: function () {
        ForumStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState(getStateFromStores());
    },
    handleThreadClick: function (thread_id) {
        console.log('clicked thread: ' + thread_id);
        ForumStore.setSelectedThread(thread_id);
        ForumAction.getPosts(thread_id);
    },

    render: function () {
        var that = this;
        if (that.state.selectedThread) {
            var threads = this.state.threads.map(
            function (thread) {
                return (
                    <div>
                        <div className="threads" id={thread.id} onClick={that.handleThreadClick.bind(this, thread.id)}>
                            <div className="noclear">Title: {thread.title}</div>
                            <div className="noclear">
                                name: {thread.creator.first_name} {thread.creator.last_name}</div>
                            <div className="noclear">email: {thread.creator.email}</div>
                        </div>
                        <div className="clearboth"></div>
                            <Post selectedTopicThread={that.state.selectedThread}/>
                    </div>
                );
            }
        );
        }

        else {
            var threads = this.state.threads.map(
            function (thread) {
                return (
                    <div>
                        <div className="threads" id={thread.id} onClick={that.handleThreadClick.bind(this, thread.id)}>
                            <div className="noclear">Title: {thread.title}</div>
                            <div className="noclear">
                                name: {thread.creator.first_name} {thread.creator.last_name}</div>
                            <div className="noclear">email: {thread.creator.email}</div>
                        </div>
                        <div className="clearboth"></div>
                    </div>
                );
            }
        );
        }

        return (
            <div>
                <div className="tbl_post">
                    {threads}
                </div>
            </div>
        );
    }
});

module.exports = TopicThread;
