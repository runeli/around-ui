import ApplicationStateStore from './ApplicationStateStore';
import io from 'socket.io-client';
import request from 'superagent';

const CLIENT_TO_SERVER_MESSAGE = 'clientToServerMessage';
const SERVER_TO_CLIENT_MESSAGE = 'aroundToClientMessage';
const AROUND_SERVER_URL = 'http://localhost:443';

const CommunicationEvents = {
    INITIAL_AROUNDS: "initialArounds",
    ADD_AROUND_MESSAGE: "addAroundMessage",
    REMOVE_THREAD: "removeThread",
    REMOVE_AROUND_MESSAGE: "removeMessageFromThread",
    VOTE_THREAD_UP: "voteThreadUp",
    VOTE_THREAD_DOWN: "voteThreadUp",
    GET_NEARBY_THREADS: "getNearbyThreads",
    CONNECTED: 'connect',
    DISCONNECTED: 'disconnect'
}

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

    addAroundThreadToStore(aroundMessage) {
        ApplicationStateStore.addSingleAround(aroundMessage);
    }

    async getSingleAroundThread(threadId) {
        const response = await request.get(`${AROUND_SERVER_URL}/api/thread/${threadId}`);
        this.addAroundThreadToStore(response);
    }
    
    _bindListenersForAroundsFromServer() {
        this.io.on(SERVER_TO_CLIENT_MESSAGE, this.addAroundThreadToStore);
        this.io.on(CommunicationEvents.INITIAL_AROUNDS, this._initialArounds);
        this.io.on(CommunicationEvents.CONNECTED, this._connected);
        this.io.on(CommunicationEvents.DISCONNECTED, this._disconnect);
    }

    _connected(){
        console.log('Connected to around server ' + AROUND_SERVER_URL);
        console.log('Waiting for server to send initial arounds...');
    }

    _disconnect() {
        console.log('Disconnected from the server');
    }

    _initialArounds(initialArounds) {
        if(initialArounds.length === 0) {
            console.warn(`Got an empty initial response from the server`);
        } else {
            const messageCount = initialArounds.map(arthread => arthread.aroundMessages.length).reduce((a,b) => a + b);
            console.log(`Received ${initialArounds.length} around threads and ${messageCount} messages`);
            ApplicationStateStore.addAroundList(initialArounds);
        }
    }
}

export default new HttpClient();