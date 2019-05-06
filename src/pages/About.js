import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/pages/About.scss';
import Button from '../components/Button';
import Label from '../components/Label';
import Input from '../components/Input';
import Flexbox from '../components/Flexbox';
import Card from '../components/Card';

class Account extends Component {
    componentDidMount() {
        console.log("account here");
    }
    render() {
        return (
            <div className="account-page" style={{ padding: 20 }}>
                About Page
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);