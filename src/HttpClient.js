import ApplicationStateStore from './ApplicationStateStore';
import request from 'superagent';

const AROUND_SERVER_URL = 'http://localhost:443';

class HttpClient {

    constructor() {
        console.log("Connecting to around server: " + AROUND_SERVER_URL);
        this._getInitialArounds();
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
        ApplicationStateStore.addSingleAround(aroundMessage);
    }    

    addAroundThreadToStore(aroundMessage) {
        ApplicationStateStore.addSingleAround(aroundMessage);
    }

    async addAroundMessage(threadId, messageId, initialMessageBody, location) {
        const messageToServer = {
            messageBody: initialMessageBody,
            date: new Date(),
            messageId,
            location: location
        };
        request
            .post(`${AROUND_SERVER_URL}/api/thread`)
            .send(messageToServer).then(() => {alert(
                'sent!'
            )}).end;
    }

    async getSingleAroundThread(threadId) {
        const response = await request.get(`${AROUND_SERVER_URL}/api/thread/${threadId}`);
        this.addAroundThreadToStore(response);
    }
    
    _bindListenersForAroundsFromServer() {

    }

    _connected() {
        console.log('Connected to around server ' + AROUND_SERVER_URL);
    }

    _disconnect() {
        console.log('Disconnected from the server');
    }

    async _getInitialArounds() {
        console.log('Fetching initial arounds...')
        const response = await request.get(`${AROUND_SERVER_URL}/api/threads/`);
        this._initialArounds(response.body);
    }

    _initialArounds(initialArounds) {
        if(initialArounds.length === 0) {
            console.warn(`Got an empty initial response from the server`);
        } else {
            const messageCount = initialArounds.map(arthread => arthread.aroundMessages.length).reduce((a,b) => a + b);
            console.log(`Received ${initialArounds.length} around threads and ${messageCount} messages`);
            ApplicationStateStore.addAroundList(initialArounds.map(this._deserializeJsonAround));
        }
    }

    _handleAroundThreadAdded(newThread) {
        ApplicationStateStore.addSingleAround(this._deserializeJsonAround(newThread));
    }

    _handleAroundAddedToThread(newAround) {
        ApplicationStateStore.addSingleAround(newAround);
    }

    _deserializeJsonAround(jsonAroundThread) {
        if(typeof jsonAroundThread.date === "string") {
            jsonAroundThread.date = new Date(jsonAroundThread.date);
        }
        return jsonAroundThread;
    }
}

export default new HttpClient();