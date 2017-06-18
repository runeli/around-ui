import React, { Component } from 'react';
import SinlgeAroundMessage from './SingleAroundMessage';
import ApplicationStateStore from './ApplicationStateStore';

class AroundsList extends Component {

    constructor() {
        super();
        this.state = {
            arounds: []
        }
    }
    
    addAroundMessage(messageObject) {
        this._scrollToBottomOfThisList();        
    }

    _addInitialArounds(messageObjects) {
        let updateTo = {
            arounds: messageObjects
        };
        this.setState(updateTo);
    }

    _scrollToBottomOfThisList() {
        this.listWrapper.parentNode.scrollTop = this.listWrapper.scrollHeight;
    }

    componentDidMount() {
        this._addInitialArounds(ApplicationStateStore.getClonedState().arounds);
        this.stateChangeListernerCallbackId = ApplicationStateStore.addStateChangeListener(state => {
            let updateTo = {
                arounds: state.arounds
            };
            this.setState(updateTo);
            this._scrollToBottomOfThisList();
        });
    }

    componentWillUnmount() {
        ApplicationStateStore.removeStateChangeListerner(this.stateChangeListernerCallbackId);
    }

    getMessages() {
        return this.state.arounds.map(msgObject => <SinlgeAroundMessage messageBody={msgObject.messageBody} key={msgObject.id.messageId}/>)
    }

    render() {
        return (
            <div className="post-message-list-wrapper" ref={listWrapper => {this.listWrapper = listWrapper;}}>
                {this.getMessages()}
            </div>
        );
    }
}

export default AroundsList;