import React, { Component } from 'react';
import ApplicationStateStore from './ApplicationStateStore';
import SingleMessageInThread from './SingleMessageInThread';
import HttpClient from './HttpClient';
import AutoResizingTextarea from './AutoResizingTextarea';
import ReactDOM from 'react-dom';


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
        if (valueToBePosted.length === 0  || this._preventPostingAnythingBeforePreviousRequestFinishes) {
            return;
        }        
        const newAroundMessageToServer = this._generateNewAroundMessageThatWillBeSentToServer(threadId, valueToBePosted);
        ApplicationStateStore.addSingleAroundToAnExistingThread(newAroundMessageToServer);
        this._preventPostingAnythingBeforePreviousRequestFinishes = true;
        const postedReply = await HttpClient.addAroundMessage(newAroundMessageToServer);
        this._preventPostingAnythingBeforePreviousRequestFinishes = false;
        ApplicationStateStore.updateThreadHavingSameThreadId(postedReply);
        this.setState({valueToBePosted: ''});
    }

    componentDidMount() {
        this.stateChangeListernerCallbackId = ApplicationStateStore.addStateChangeListener(() => {
            this.forceUpdate();
        });
        window.onresize = () => {
            this.forceUpdate();
        }
    }

    componentWillUnmount() {
        window.onresize = undefined;
        ApplicationStateStore.removeStateChangeListerner(this.stateChangeListernerCallbackId);
    }

    componentDidUpdate() {
        const allThreads = ReactDOM.findDOMNode(this).querySelectorAll('.around-thread');
        if(allThreads.length > 0) {
            const last = allThreads[allThreads.length - 1];
            this._setParentScrollToBottom(last);
        }
    }

    _getThreadByIdFromStore(threadId) {
        const threadData = ApplicationStateStore.getClonedState().arounds.find(thread => thread.threadId === threadId);
        if (!threadData) {
            return (<div></div>);
        }
        return this._getThreadMessageElements(threadData)
    }

    _getThreadMessageElements(threadData) {
        return threadData.aroundMessages.map(message => <SingleMessageInThread key={message.messageId}>{message.messageBody}</SingleMessageInThread>)
    }

    _getParentContainerHeight() {
        if  (this.container) {
            return parseInt(getComputedStyle(this.container.parentNode).height, 10);
        } else {
            setTimeout(() => {this.forceUpdate()}, 0);
            return 0;
        }
    }

    _setParentScrollToBottom(elementToScrollTo) {
        elementToScrollTo.scrollIntoView();
    }

    _generateNewAroundMessageThatWillBeSentToServer(threadId, initialMessageBody, location) {
        return {
            messageBody: initialMessageBody,
            date: new Date(),
            location,
            threadId
        };
    }

    render() {
        const heightOfParentComponent = this._getParentContainerHeight();
        return (
            <div className="flex-container" style={{height: heightOfParentComponent}} ref={container => { this.container = container; }}>
                <div className="flex-scalable-content">
                    {this._getThreadByIdFromStore(this.props.match.params.threadId)}
                </div>
                <div className="bottom-fixed-textarea-container flex-fixed">
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