import React, { Component } from 'react';
import ApplicationStateStore from './ApplicationStateStore';
import SingleMessageInThread from './SingleMessageInThread';
import HttpClient from './HttpClient';
class ThreadView extends Component {

    componentDidMount() {
        this.stateChangeListernerCallbackId = ApplicationStateStore.addStateChangeListener(() => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() { 
        ApplicationStateStore.removeStateChangeListerner(this.stateChangeListernerCallbackId);
    }

    _getThreadByIdFromStore(threadId) {
        const threadData = ApplicationStateStore.getClonedState().arounds.find(thread => thread.threadId === threadId);
        if(!threadData) {
            HttpClient.getSingleAroundThread(threadId)
            return (<div></div>);
        }
        return this._getThreadMessageElements(threadData)
    }

    _getThreadMessageElements(threadData) {
        return threadData.aroundMessages.map((message, i) => {
            return <SingleMessageInThread preventAnimation={i > 0} key={message.messageId}>{message.messageBody}</SingleMessageInThread>
        })
    }

    render() {
        return (
            <div>
                {this._getThreadByIdFromStore(this.props.match.params.threadId)}
            </div>
        );
    }
}

export default ThreadView;