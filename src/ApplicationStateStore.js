import _ from 'lodash';
import uuid from 'uuid';

const defaultState = {
    arounds: []
};

class ApplicationStateStore {

    constructor() {
        this._state = defaultState;
        this.stateChangeHandlers = [];
    }

    getState() {
        return this._state;
    }

    getClonedState() {
        return _.cloneDeep(this._state);
    }

    setState(state) {
        _.assign(this._state, state);
        this._executeStateChangeHandlersWhenStateHasChanged();
    }
    
    addAroundList(aroundList) {
        const clonedState = this.getClonedState();
        this.setState({arounds: clonedState.arounds.concat(aroundList).sort(this._getComparator())});
    }

    addSingleAround(singleAround) {
        const aroundList = [singleAround];
        this.addAroundList(aroundList);
    }

    addSingleAroundToAnExistingThread(aroundMessage) {
        if (!aroundMessage.messageId) {
            console.log('Assigned temporary threadId');
            aroundMessage.messageId = uuid.v4();
        }
        const allArounds = this.getClonedState().arounds;
        const aroundThreadToModify = allArounds.find(around => around.threadId === aroundMessage.threadId);
        aroundThreadToModify.aroundMessages.push(aroundMessage);
        this.setState({arounds: allArounds});
    }

    hasArounds() {
        return this._state.arounds.length > 0;
    }

    addStateChangeListener(handlerFunction) {
        this.stateChangeHandlers.push(handlerFunction);
        return this.stateChangeHandlers.length - 1;
    }

    removeStateChangeListerner(indexOfHandler) {
        this.stateChangeHandlers.splice(indexOfHandler, 1);
    }

    updateThreadHavingSameThreadId(threadThatOverridesExistingWithSameThreadId) {
        const allArounds = this.getClonedState().arounds;
        try {
            const aroundMessageToModifyIndex = allArounds.findIndex(around => around.threadId === threadThatOverridesExistingWithSameThreadId.threadId)
            allArounds[aroundMessageToModifyIndex] = threadThatOverridesExistingWithSameThreadId;
        } catch (e) {
            console.warn('Unable to find and update a local message having temporarMessageId')
        }
        this.setState({arounds: allArounds});
    }

    _executeStateChangeHandlersWhenStateHasChanged() {
        this.stateChangeHandlers.forEach(handler => {
            handler(this._state);
        });
    }
    

    _getComparator() {
        return (a, b) => {
            if(a.date.getTime() < b.date.getTime()) {
                return 1;
            } else {
                return -1;
            }
        }
    }
}

export default new ApplicationStateStore();