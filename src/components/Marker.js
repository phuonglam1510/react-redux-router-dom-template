import React, { Component } from 'react';
import '../styles/components/Marker.scss';


class Marker extends Component {
    render() {
        const { text, containerStyle } = this.props;
        return (
            <div className={"marker"} style={{ ...containerStyle }}>
                <div className="inner"></div>
            </div>
        );
    }
}



export default Marker;