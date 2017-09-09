import React, { Component } from 'react';
import HttpClient from './HttpClient';

const locationFetchState = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};

class LocationDisplayPane extends Component {

    constructor() {
        super();
        this.state = {
            locationFetchState: locationFetchState.PENDING
        };
    }

    componentWillMount() {
        const ipAddressLocationData = HttpClient.getIpAddressLocationData().then(locationData => {            
            this.setState({
                city: locationData.body.city,
                locationFetchState: 'SUCCESS'
            });
        }).catch(this._displayLocationErrorWarning.bind(this));
    }

    _displayLocationErrorWarning() {
        this.setState({
            locationFetchState: 'FAILED'
        });
    }

    _getLocationFetchText(state, city) {
        if(state === locationFetchState.SUCCESS) {
            return '♡ ' + city;
        } else if(state === locationFetchState.PENDING) {
            return 'Loading location data...';
        } else {
            return 'Location data unavailable';
        }
    }

    render() {
        const displayText = this._getLocationFetchText(this.state.locationFetchState, this.state.city);
        return (
            <div className="location-display-pane">
                {displayText}
            </div>
        );
    }
}

export default LocationDisplayPane;