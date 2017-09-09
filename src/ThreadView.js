import React, { Component } from 'react';
import ApplicationStateStore from './ApplicationStateStore';
import SingleMessageInThread from './SingleMessageInThread';
import HttpClient from './HttpClient';
import AutoResizingTextarea from './AutoResizingTextarea';

class ThreadView extends Component {

    constructor() {
        super();
        this.state = {
            valueToBePosted: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(a) {
        this.setState({valueToBePosted: a.target.value});
    }

    async handlePostMessageToThread() {
        const threadId = this.props.match.params.threadId;
        const valueToBePosted = this.state.valueToBePosted;
        if (valueToBePosted.length === 0) {
            return;
        }
        const postedReply = await HttpClient.addAroundMessage(threadId, this.state.valueToBePosted);
        ApplicationStateStore.addSingleAroundToAnExistingThread(postedReply);
        this.setState({valueToBePosted: ''});
    }

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
            return <SingleMessageInThread key={message.messageId}>{message.messageBody}</SingleMessageInThread>
        })
    }

    render() {
        return (
            <div>
                {this._getThreadByIdFromStore(this.props.match.params.threadId)}
                <div className="bottom-fixed-textarea-container">
                    <AutoResizingTextarea 
                            className="new-around-input-textarea textarea-container" 
                            value={this.state.valueToBePosted} 
                            onChange={this.handleChange} 
                            autoComplete="false" 
                            spellCheck="false"
                            placeholder="Reply..."/>
                <div className="button-reply" onClick={this.handlePostMessageToThread.bind(this)}>➣</div>
                </div>                
            </div>
        );
    }
}

export default ThreadView;