import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Icon.scss';

class Icon extends Component {
    onClick = () => {

    }
    render() {
        const { name, width, height, style } = this.props;
        return (
            <div className="icon-container" style={style || {}} onClick={this.onClick}>
                <img width={width || 40} height={height || 40} src={process.env.PUBLIC_URL + '/icons/' + name + '.png'}></img>
            </div>
        );
    }
}


export default Icon;
