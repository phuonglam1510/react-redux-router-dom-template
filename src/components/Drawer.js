import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { logout } from '../actions/authAction';

import styles from '../styles/Colors.scss';
import '../styles/Drawer.scss';
import { ROUTES } from '../constants/ROUTES';
import Icon from './Icon';
import Flexbox from './Flexbox';
import Button from './Button';
import { withRouter } from 'react-router-dom';
import Label from './Label';


class Drawer extends Component {
    logout = () => {
        const { history } = this.props;

        history.push(ROUTES.LOGIN);
        this.props.logout();
    }
    render() {
        const { history, location, detail, awaitingResults, completedAuctions, upcomingTotal } = this.props;

        return (
            <div className="drawer-container">
                <Flexbox containerStyle={{ height: '100%' }} spaceBetween>
                    <div style={{ width: '100%' }}>
                        <ul className="main-menu">
                            <li>
                                <Link className={location.pathname === ROUTES.DASHBOARD ? "active" : ""} to={ROUTES.DASHBOARD}>
                                    <Flexbox row containerStyle={{ justifyContent: 'flex-start' }}>
                                        <Icon width={15} height={15} name="dashboard"></Icon>
                                        <span style={{ marginLeft: 10 }}>Dashboard</span>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.ABOUT ? "active" : ""} to={ROUTES.ABOUT}>
                                    <Flexbox row containerStyle={{ justifyContent: 'flex-start' }}>
                                        <Icon width={15} height={15} name="chart"></Icon>
                                        <span style={{ marginLeft: 10 }}>About</span>
                                    </Flexbox>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Flexbox>
            </div>

        );
    }
}



export function mapStateToProps(state) {
    return {
        // detail: state.auctioneer.detail,
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer));