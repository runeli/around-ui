// let request = require('superagent');
//import generateAround from './AroundRandomGenerator'
import ApplicationStateStore from './ApplicationStateStore';
import io from 'socket.io-client';

const CLIENT_TO_SERVER_MESSAGE = 'clientToServerMessage';
const SERVER_TO_CLIENT_MESSAGE = 'aroundToClientMessage';
const INITIAL_AROUNDS = 'initialArounds';
const AROUND_SERVER_URL = process.env.AROUND_SERVER || 'https://192.168.0.12:8080/';
class HttpClient {

    constructor() {
        console.log("Connecting to around server: " + AROUND_SERVER_URL);
        this.io = io(AROUND_SERVER_URL);
        this._bindListenersForAroundsFromServer();
    }

    getArounds(location) {
        if(ApplicationStateStore.hasArounds()) {
            return Promise.resolve(ApplicationStateStore.getClonedState().arounds);
        }
        //const helsinkiLocation = {lng: 24.9410248, lat:60.1733244};
        const arounds = [];
        return new Promise((resolve, reject) => {            
            setTimeout(() => {resolve(arounds)}, 1000);
        });
    }

    aroundToServerMessage(aroundMessage) {
        this.io.emit(CLIENT_TO_SERVER_MESSAGE, aroundMessage);
        ApplicationStateStore.addSingleAround(aroundMessage);
    }    

    serverToAroundMessage(aroundMessage) {
        ApplicationStateStore.addSingleAround(aroundMessage);
    }
    
    _bindListenersForAroundsFromServer() {
        this.io.on(SERVER_TO_CLIENT_MESSAGE, this.serverToAroundMessage);
        this.io.on(INITIAL_AROUNDS, this._initialArounds);
    }

    _initialArounds(initialArounds) {
        ApplicationStateStore.addAroundList(initialArounds);
    }

    

}

export default new HttpClient();