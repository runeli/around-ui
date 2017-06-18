import _ from 'lodash';

const defaultState = {
    arounds: [],

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
        this.setState({arounds: clonedState.arounds.concat(aroundList)});
    }

    addSingleAround(singleAround) {
        const aroundList = [singleAround];
        this.addAroundList(aroundList);
    }

    hasArounds() {
        this._state.arounds.length > 0;
    }

    addStateChangeListener(handlerFunction) {
        this.stateChangeHandlers.push(handlerFunction);
        return this.stateChangeHandlers.length - 1;
    }

    removeStateChangeListerner(indexOfHandler) {
        this.stateChangeHandlers.splice(indexOfHandler, 1);
    }

    _executeStateChangeHandlersWhenStateHasChanged() {
        this.stateChangeHandlers.forEach(handler => {
            handler(this._state);
        });
    }
}

export default new ApplicationStateStore();