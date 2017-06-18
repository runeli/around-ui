function browserCanUseGeolocation() {
    return 'geolocation' in navigator;
}
export default {
    isLocationAllowed: () => {
        return navigator.permissions.query({name:'geolocation'}).then(status => status.state === 'granted')
    },

    getCurrentLocation() {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, {maximumAge:60000, timeout:5000, enableHighAccuracy:true})
        });
    }

}