import React, { Component } from 'react';
import styles from '../styles/Colors.scss';

import '../styles/components/Label.scss';

class Label extends Component {
    render() {
        const { containerStyle, text, background, color, dot } = this.props;
        return (
            <div className={"label"} style={{ display: 'inline-block', backgroundColor: background || styles.grayColor, color: color || 'white', height: dot ? 0 : 12, ...containerStyle }}>
                <div className="text">{text}</div>
            </div>
        );
    }
}



export default Label;