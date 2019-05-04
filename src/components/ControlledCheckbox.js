import React, { Component } from 'react';

import Checkbox from './Checkbox';

class ControlledCheckbox extends Component {
    state = {
        checked: false
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: props.defaultValue
        };
    }
    check = () => {
        const { onChange } = this.props;
        this.setState({ checked: !this.state.checked }, () => {
            if (onChange) {
                onChange(this.state.checked);
            }
        });
    }
    render() {
        const { containerStyle, label } = this.props;
        const { checked } = this.state;

        return (
            <Checkbox containerStyle={containerStyle} label={label} checked={checked} onChange={this.check}></Checkbox>
        );
    }
}



export default ControlledCheckbox;