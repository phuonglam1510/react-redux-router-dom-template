import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/components/Dropdown.scss';
import Flexbox from './Flexbox';

class Dropdown extends Component {
    state = {
        active: false
    }
    toggle = () => {
        this.setState({ active: !this.state.active });
    }
    select = (item) => {
        this.setState({ active: false });
        this.props.onChanged({ item });
    }
    render() {
        const { selected, items, placeholder, containerStyle } = this.props;
        const { active } = this.state;
        return (
            <div className="dropdown">
                <div className={"main" + (active ? ' active' : '') + (selected ? '' : ' placeholder')} style={{ ...containerStyle }} onClick={this.toggle}>
                    <Flexbox row spaceBetween>
                        <div>{selected ? selected.text : placeholder}</div>
                        <div className={"handle" + (active ? ' active' : '')}></div>
                    </Flexbox>
                </div>
                <div className={"dropdown-content" + (active ? ' active' : '')}>
                    {items.map(item => <div onClick={() => this.select(item)} key={item.value} className="item">{item.text}</div>)}
                </div>
            </div>
        );
    }
}



export default Dropdown;