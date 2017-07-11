import React, { Component } from 'react';
import ApplicationStateStore from './ApplicationStateStore';
import HttpClient from './HttpClient';
import PostActionButton from './PostActionButton';
import SingleAroundThread from './SingleAroundThread';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group';

class AroundThreadList extends Component {

    constructor() {
        super();
        this.state = {
            aroundThreads: [],
            activeThreadId: null
        }
    }

    handleThreadClick(threadId) {
        this.context.router.history.push('/thread/'+ threadId);      
    }

    componentDidMount() {
        this._setThreads(ApplicationStateStore.getClonedState());
        this.stateChangeListernerCallbackId = ApplicationStateStore.addStateChangeListener(this._setThreads.bind(this))
    }

    _addInitialArounds() {
      
    }

    _setThreads(aroundThreads) {
        let updateTo = {
            aroundThreads: aroundThreads.arounds
        };
        this.setState(updateTo);  
    }
    
    _buildAroundThreadList() {
        return this.state.aroundThreads.map(thread => {
            const animatingCssClass = this.state.activeThreadId !== null && this.state.activeThreadId !== thread.threadId ? 'move-left' : '';
            return <SingleAroundThread
                animatingCssClass={animatingCssClass} 
                key={thread.threadId}
                initialMessage={thread.aroundMessages[0].messageBody}
                onThreadClick={this.handleThreadClick.bind(this, thread.threadId)}

            />;
        });
    }

    render() {
        return (
            <div className="thread-list-wrapper">
                {this._buildAroundThreadList()}
                <PostActionButton />
            </div>
        );
    }
    
}

AroundThreadList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AroundThreadList;