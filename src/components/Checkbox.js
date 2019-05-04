import React, { Component } from 'react';
import styles from '../styles/Colors.scss';

import '../styles/components/Checkbox.scss';
import Flexbox from './Flexbox';

class Checkbox extends Component {
    check = () => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(!this.props.checked);
        }
    }
    render() {
        const { containerStyle, label, checked } = this.props;

        return (
            <div onClick={this.check} className="checkbox" style={{ ...containerStyle }}>
                <Flexbox row>
                    <div className={"main" + (checked ? ' checked' : '')}>
                        {checked && <div className={"checkmark"}></div>}
                    </div>
                    {label && <label>{label}</label>}
                </Flexbox>
            </div>
        );
    }
}



export default Checkbox;