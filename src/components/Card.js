import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/Card.scss';

class Card extends Component {
    render() {
        const { minWidth, containerStyle, noPadding, shadow, key } = this.props;
        return (
            <div key={key} className={"card" + (noPadding ? '' : ' padding') + (shadow ? ' shadow' : '')} style={{ minWidth: minWidth || 'auto', ...containerStyle }}>
                {this.props.children}
            </div>
        );
    }
}



export default Card;