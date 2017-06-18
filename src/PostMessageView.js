import React, { Component } from 'react';
import PostMessageInput from './PostMessageInput';
import AroundsList from './AroundsList';
import LocationService from './LocationService';
import HttpClient from './HttpClient';

class PostMessageView extends Component {
    
    async handleAroundAdd(messageBody) {
        let coords;
        try {
            coords = await LocationService.getCurrentLocation();
        } catch (e) { //no permission from the user
            coords = {coords: {coords: {latitude: 0, longitude: 0}}};
        }
        const aroundMessage = {
            messageBody, 
            location: {
                lat: coords.coords.latitude, 
                lng: coords.coords.longitude
            }, 
            date: new Date(), 
            id: {messageId: (new Date()).getTime().toString()}
        };
        HttpClient.aroundToServerMessage(aroundMessage);
    }

    render() {
        return (
            <div className="post-message-view-wrapper">
                <AroundsList ref={(aroundList) => { this.aroundList = aroundList; }}/>
                <PostMessageInput onAroundAdd={this.handleAroundAdd.bind(this)}/>
            </div>
        );
    }
}

export default PostMessageView;