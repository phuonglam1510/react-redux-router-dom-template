
const getState = (placeObject) => {
    if (placeObject && placeObject.address_components) {
        return placeObject.address_components.filter(item => {
            return item.types && item.types.indexOf('administrative_area_level_1') >= 0;
        })[0].long_name;
    } else {
        return null;
    }
}

const getCity = (placeObject) => {
    if (placeObject && placeObject.address_components) {
        return placeObject.address_components.filter(item => {
            return item.types && item.types.indexOf('locality') >= 0;
        })[0].long_name;
    } else {
        return null;
    }
}

const getCoordinate = placeObject => {
    if (placeObject && placeObject.geometry && placeObject.geometry.location) {
        return {
            lat: placeObject.geometry.location.lat(),
            lng: placeObject.geometry.location.lng(),
        };
    } else {
        return null;
    }
}
export default {
    getState,
    getCoordinate,
    getCity
}
