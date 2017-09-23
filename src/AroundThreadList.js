import React, { Component } from 'react';
import ApplicationStateStore from './ApplicationStateStore';
import GotoPostAroundViewButton from './GotoPostAroundViewButton';
import SingleAroundThread from './SingleAroundThread';
import PropTypes from 'prop-types';
import LocationDisplayPane from './LocationDisplayPane';

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

    componentWillUnmount() {
        ApplicationStateStore.removeStateChangeListerner(this.stateChangeListernerCallbackId);
    }

    _setThreads(aroundThreads) {
        let updateTo = {
            aroundThreads: aroundThreads.arounds
        };
        this.setState(updateTo);  
    }
    
    _buildAroundThreadList() {
        return this.state.aroundThreads.map(thread => {
            return <SingleAroundThread
                key={thread.threadId}
                initialMessage={thread.aroundMessages[0].messageBody}
                onThreadClick={this.handleThreadClick.bind(this, thread.threadId)}
                count={thread.aroundMessages.length}
            />;
        });
    }

    render() {
        return (
            <div className="thread-list-wrapper">
                <LocationDisplayPane />
                {this._buildAroundThreadList()}
                <GotoPostAroundViewButton />
            </div>
        );
    }
    
}

AroundThreadList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AroundThreadList;