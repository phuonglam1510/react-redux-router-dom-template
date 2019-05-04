import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Input from './Input';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };
    loadMapAPI = ({ map, maps }) => {
        this.setState({ maps });
        if (this.props.onAPILoaded) {
            this.props.onAPILoaded(maps);
        }
    }
    render() {
        const { marker, onMapClick, zoom } = this.props;
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: 500, width: '100%' }}>
                <GoogleMapReact
                    onClick={onMapClick}
                    options={{
                        mapTypeControl: true
                    }}
                    zoom={16}
                    center={marker}
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API, libraries: ['places'] }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={this.loadMapAPI}
                >
                    {marker && marker.lat !== 0 && <Marker
                        lat={marker.lat}
                        lng={marker.lng}
                        text="Location"
                    ></Marker>}
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;