import ApplicationStateStore from './ApplicationStateStore';
import request from 'superagent';



class HttpClient {

    constructor() {        
        this.aroundServerUrl = HttpClient._getHostname();
        console.log("Connecting to around server: " + this.aroundServerUrl);
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

    async addAroundMessage(messageToServer) {
        const response = await request
            .post(`${this.aroundServerUrl}/api/thread`)
            .send(messageToServer);
            if(response.body) {
                response.body.date = new Date(response.body.date);
            }
        return response.body;
    }

    async getSingleAroundThread(threadId) {
        const response = await request.get(`${this.aroundServerUrl}/api/thread/${threadId}`);
        this.addAroundThreadToStore(this._deserializeThreadAndItsMessages(response.body.thread));
    }

    async getIpAddressLocationData() {
        return request.get(`${this.aroundServerUrl}/api/ip`);
    }

    _connected() {
        console.log('Connected to around server ' + this.aroundServerUrl);
    }

    _disconnect() {
        console.log('Disconnected from the server');
    }

    async _getInitialArounds() {
        console.log('Fetching initial arounds...');
        const response = await request.get(`${this.aroundServerUrl}/api/threads/`);
        const initialArounds = response.body;
        if(initialArounds.length === 0) {
            console.warn(`Got an empty initial response from the server`);
        } else {
            const messageCount = initialArounds.map(arthread => arthread.aroundMessages.length).reduce((a,b) => a + b);
            console.log(`Received ${initialArounds.length} around threads and ${messageCount} messages`);
            ApplicationStateStore.addAroundList(initialArounds.map(this._deserializeThreadAndItsMessages, this));
        }
    }

    _handleAroundThreadAdded(newThread) {
        ApplicationStateStore.addSingleAround(this._deserializeThreadAndItsMessages(newThread));
    }

    _handleAroundAddedToThread(newAround) {
        ApplicationStateStore.addSingleAround(newAround);
    }

    _deserializeThreadAndItsMessages(jsonAroundThread) {
        this._deserializeTimestamp(jsonAroundThread);
        jsonAroundThread.aroundMessages.map(this._deserializeTimestamp)
        return jsonAroundThread;
    }

    _deserializeTimestamp(objectWithDateAsString) {
        if(typeof objectWithDateAsString.date === "string") {
            objectWithDateAsString.date = new Date(objectWithDateAsString.date);
        }
        return objectWithDateAsString;
    }

    static _getHostname() {
        if(process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
            return 'https://around-app-server.herokuapp.com';
        } else {
            return 'http://192.168.0.12:443';
        }
    }
}

export default new HttpClient();