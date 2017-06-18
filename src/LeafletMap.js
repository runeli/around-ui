import React from 'react';
import LocationService from './LocationService';
import PostActionButton from './PostActionButton';
import {MapStyle} from './MapStyles';
import ApplicationStateStore from './ApplicationStateStore';
const VIEWPORT_INFORMATION_ID = 'viewPortId';
const MAP_COMPONENT_ID = 'mapContainerId';

class LeafletMap extends React.Component {

    constructor() {
        super();
        this.infoWindows = [];
    }

    componentDidMount() {
        this._injectMap();
    }

    componentWillUnmount() {
        ApplicationStateStore.removeStateChangeListerner(this._aroundStoreStateChangeListenerId);
    }

    _injectViewPortInformation() {
        let metaElement = document.createElement('meta');
        metaElement.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        metaElement.name = "viewport";
        metaElement.id = VIEWPORT_INFORMATION_ID;
        document.head.appendChild(metaElement);
    }

    async _injectMap() {
        const google = window.google; 
        const coords = await LocationService.getCurrentLocation();          
        const center = {lat: coords.coords.latitude, lng: coords.coords.longitude};
        const map = new google.maps.Map(document.getElementById(MAP_COMPONENT_ID), {
            zoom: 15,
            center,
            disableDefaultUI: true
        });
        map.mapTypes.set('light_around_map', new google.maps.StyledMapType(MapStyle));
        map.setMapTypeId('light_around_map');
        map.addListener('click', () => {
            this._closeInfoBox()
        });
        this._bindUpdateAroundsOnMapWhenNewAroundsAreAddedToApplicationStateStore(map);
        this._addAroundsToMapAsMarkers(map, ApplicationStateStore.getClonedState().arounds);
    }

    _bindUpdateAroundsOnMapWhenNewAroundsAreAddedToApplicationStateStore(map) {
        this._aroundStoreStateChangeListenerId = ApplicationStateStore.addStateChangeListener(aroundState => this._addAroundsToMapAsMarkers(map, aroundState.arounds));        
    }

    _addAroundsToMapAsMarkers(map, arounds) {
        const google = window.google;
        console.log(arounds);
        arounds.forEach(around => {
            const marker = new google.maps.Marker({
                position: {lng: around.location.lng, lat:around.location.lat},
                map: map,
                title: around.messageBody
            });
            this._bindInfoBoxClickingClosingPreviousInfoBoxAndOpeningNewOne(map, marker, around.messageBody);
        });
    }

    _bindInfoBoxClickingClosingPreviousInfoBoxAndOpeningNewOne(map, marker, messageBody) {
        const google = window.google; 
        marker.addListener('click', () => {
            this._closeInfoBox();
            this.infoWindow = new google.maps.InfoWindow({content: messageBody});
            this.infoWindow.open(map, marker);
        });
    }

    _closeInfoBox() {
        if(this.infoWindow) {
            this.infoWindow.close();
        }
    }

    _uninjectViewPortInformation() {
        document.head.removeChild(document.getElementById(VIEWPORT_INFORMATION_ID));
    }

    render() {
        return (
            <div>
                <div id={MAP_COMPONENT_ID} />
                <PostActionButton />                
            </div>
        );
    }
}

export default LeafletMap;