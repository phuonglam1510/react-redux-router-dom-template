
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Flexbox.scss';

class Flexbox extends Component {
    render() {
        const { row, spaceBetween, padding, wrapperStyle } = this.props;
        return (
            <div className="flexbox" style={{
                display: 'flex',
                flexDirection: row ? 'row' : 'column',
                justifyContent: spaceBetween ? 'space-between' : 'center',
                alignItems: 'center',
                padding: padding || 0,
                flexWrap: 'wrap',
                ...wrapperStyle
            }}>
                {this.props.children}
            </div>
        );
    }
}


export default Flexbox;