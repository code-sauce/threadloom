"use strict";
var React = require('react');
var ForumStore = require('../stores/forum');
var ForumAction = require('../actions/forum');


function getStateFromStores() {
    return {
        posts: ForumStore.getPosts(),  // gets the posts for selected thread
        selectedTopicThread: ForumStore.getSelectedThread()
    };
}

var initialState = {
    posts: [],
    selectedTopicThread: undefined
};

var Post = React.createClass({
    getInitialState: function () {
        ForumAction.getPosts(this.props.selectedTopicThread);
        return initialState;
    },
    // Add change listeners to stores
    componentDidMount: function () {
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
    handlePostClick: function (post_id) {
        console.log('clicked post: ' + post_id);
    },
    handleAddReply: function(post_id) {
        console.log('adding reply to post: ' + post_id);
        ForumAction.addReply(this.state.selectedTopicThread, post_id, this.state.replyContent, this.state.replyUser);
    },
    onReplyContentChange: function (evt) {
        var content = evt.target.value;
        this.setState({replyContent: content});
    },
    onReplyUserChange: function (evt) {
        var content = evt.target.value;
        this.setState({replyUser: content});
    },

    //add post functions
    handleNewPost: function(thread_id) {
        console.log('adding post to thread: ' + thread_id);
        ForumAction.addPost(thread_id, this.state.newPostContent, this.state.newPostUser);
    },
    onNewPostContentChange: function (evt) {
        var content = evt.target.value;
        this.setState({newPostContent: content});
    },
    onNewPostUserChange: function (evt) {
        var content = evt.target.value;
        this.setState({newPostUser: content});
    },

    render: function () {
        var that = this;
        var posts = this.state.posts.map(
            function (post) {
                return (
                    <div>
                        <div className="posts" id={post.id} onClick={that.handlePostClick.bind(this, post.id)}>
                            <div className="noclear">Post content: {post.content}</div>
                            <div className="noclear">Author name: {post.author.first_name} {post.author.last_name}</div>
                            <div className="noclear">Author email: {post.author.email}</div>
                        </div>
                        <div className="clearboth"></div>
                        <div className="replies">
                            {
                                post.replies.map(function(reply){
                                    return (
                                        <div>
                                            <div className="noclear">reply: {reply.content}</div>
                                            <div className="noclear">author: {reply.author.email}</div>
                                            <div className="clearboth"></div>
                                        </div>
                                    );
                                })
                            }
                            <input type='text' className="newReply" placeholder="add reply.." name='newReply' value={that.state.replyContent} onChange={that.onReplyContentChange} />
                            <input type='text' className="newReplyUser" placeholder="your email.." name='newReplyUser' value={that.state.replyUser} onChange={that.onReplyUserChange} />
                            <div className="add-reply" onClick={that.handleAddReply.bind(this, post.id)}>+ Reply</div>
                        </div>
                    </div>
                );
            }
        );

        return (
            <div>
                <div className="tbl_post">
                    {posts}
                </div>
                <div className="posts">
                    <input type='text' className="newPost" placeholder="add post.." name='newReply' value={that.state.newPostContent} onChange={that.onNewPostContentChange} />
                    <input type='text' className="newReplyUser" placeholder="your email.." name='newReplyUser' value={that.state.newPostUser} onChange={that.onNewPostUserChange} />
                    <div className="add-reply" onClick={that.handleNewPost.bind(this, that.props.selectedTopicThread)}>+ Post</div>
                </div>
            </div>
        );
    }
});

module.exports = Post;
