import React, { Component } from 'react';
import HttpClient from './HttpClient';
import ApplicationStateStore from './ApplicationStateStore';

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
        const maybeLocation = ApplicationStateStore.getCurrentLocationName();
        if(maybeLocation) {
            this.setState({
                locationName: maybeLocation,
                locationFetchState: locationFetchState.SUCCESS
            });
        } else {
            HttpClient.getIpAddressLocationData().then(locationData => {            
                ApplicationStateStore.setCurrentLocationName(locationData.body.city);
                this.setState({
                    locationName: locationData.body.city,
                    locationFetchState: locationFetchState.SUCCESS
                });
            }).catch(this._displayLocationErrorWarning.bind(this));
        }
    }

    _displayLocationErrorWarning() {
        this.setState({
            locationFetchState: locationFetchState.FAILED
        });
    }

    _getLocationFetchText(state, locationName) {
        if(state === locationFetchState.SUCCESS) {
            return '♡ ' + locationName;
        } else if(state === locationFetchState.PENDING) {
            return 'Loading location data...';
        } else {
            return 'Location data unavailable';
        }
    }

    _setLocation(locationName) {
        this.setState({
            locationName,
            locationFetchState: locationFetchState.SUCCESS
        });
    }

    render() {
        const displayText = this._getLocationFetchText(this.state.locationFetchState, this.state.locationName);
        return (
            <div className="location-display-pane">
                {displayText}
            </div>
        );
    }
}

export default LocationDisplayPane;