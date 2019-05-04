import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Colors.scss';

import '../styles/components/Button.scss';

class Button extends Component {
    render() {
        const { text, onClick, loading, backgroundColor, textColor, containerStyle, disabled } = this.props;
        return (
            <button disabled={loading || disabled} className="btn" style={{
                opacity: loading || disabled ? 0.5 : 1, backgroundColor: backgroundColor || styles.primaryColor,
                color: textColor || 'white', ...containerStyle
            }
            } onClick={onClick} > {loading ? 'Loading' : text}</button >
        );
    }
}


Button.propTypes = {
    text: PropTypes.string.isRequired
};


export default Button;
