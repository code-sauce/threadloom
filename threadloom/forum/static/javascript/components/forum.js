"use strict";
var React = require('react');
var ForumStore = require('../stores/forum');
var ForumAction = require('../actions/forum');
var TopicThread = require('../components/topicthread');


function getStateFromStores() {
    return {
        topics: ForumStore.getTopics(),
        selectedTopic: ForumStore.getSelectedTopic()
    };
}

var initialState = {
    topics: [],
    selectedTopic: undefined
};

var Forum = React.createClass({
    getInitialState: function () {
        ForumAction.getTopics();
        return initialState;
    },
    // Add change listeners to stores
    componentDidMount: function () {
        ForumStore.addChangeListener(this._onChange); // TODO
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
    handleTopicClick: function(topic_id) {
        console.log('settings selected topic: ' + topic_id);
        ForumStore.setSelectedTopic(topic_id);
        ForumAction.getThreads(topic_id);
    },

    render: function () {
        var that = this;
        var topics = this.state.topics.map(
            function(topic) {
                return (
                    <tr id={topic.id} onClick={that.handleTopicClick.bind(this, topic.id)}>
                        <td className="topic_title">{topic.title}</td>
                        <td className="topic_creator_fn">{topic.creator.first_name}</td>
                        <td className="topic_creator_ln">{topic.creator.last_name}</td>
                        <td className="topic_creator_email">{topic.creator.email}</td>
                    </tr>
                );
            }
        );

        if (this.state.selectedTopic) {
            console.log('selected topic.....');
            return (
                <div>
                    <table className="tbl_forum">
                        {topics}
                    </table>

                    <div className="thread">
                            <TopicThread selectedTopic={this.state.selectedTopic} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <table className="tbl_forum">
                        {topics}
                    </table>
                </div>
            );
        }

    }
});

module.exports = Forum;
