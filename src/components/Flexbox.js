
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Flexbox.scss';

class Flexbox extends Component {
    render() {
        const { row, spaceBetween, padding, containerStyle, flexStart } = this.props;
        return (
            <div className="flexbox" style={{
                display: 'flex',
                flexDirection: row ? 'row' : 'column',
                justifyContent: spaceBetween ? 'space-between' : (flexStart ? 'flex-start' : 'center'),
                alignItems: 'center',
                padding: padding || 0,
                flexWrap: 'wrap',
                ...containerStyle
            }}>
                {this.props.children}
            </div>
        );
    }
}


export default Flexbox;