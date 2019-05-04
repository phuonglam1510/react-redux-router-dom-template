import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Input.scss';
import Icon from './Icon';

class Input extends Component {
    onChange = (event) => {
        const { onChange, name } = this.props;
        if (onChange) {
            onChange(name, event.target.value);
        }
    }
    empty = () => { }
    onBlur = (event) => {
        const { require, name, onBlur, value, onValidate } = this.props;
        if (onBlur) {
            onBlur(event);
        }
        if (!onValidate || !name) {
            return;
        }
        if (require && !value) {
            onValidate(name, false);
        } else {
            onValidate(name, true);
        }
    }
    render() {
        const { value, label, placeholder, require, password, containerStyle, icon, onFocus, iconRight, iconWidth, iconHeight, editable } = this.props;
        return (
            <div className="input-container" style={{ ...containerStyle }}>
                {label && <label>{label}<span className="require">{require ? '*' : ''}</span></label>}
                <div style={{ position: 'relative', display: 'flex' }}>
                    {icon && <Icon width={iconWidth || 15} height={iconHeight || 15} style={{ position: 'absolute', [iconRight ? 'right' : 'left']: 10, top: 12 - ((iconHeight - 15) / 2) }} name={icon}></Icon>}
                    <input onFocus={onFocus || this.empty} onBlur={this.onBlur} style={{ paddingLeft: icon && !iconRight ? 30 : 10, flex: 1 }} type={password ? 'password' : 'text'}
                        value={value} placeholder={placeholder} onChange={this.onChange}></input>
                </div>
            </div>
        );
    }
}


Input.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};


export default Input;