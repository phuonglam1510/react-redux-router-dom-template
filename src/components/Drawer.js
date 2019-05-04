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
import { AUCTION_STATUS } from '../constants/AUCTION';


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
                <Flexbox wrapperStyle={{ height: '100%' }} spaceBetween>
                    <div style={{ width: '100%' }}>
                        <ul className="main-menu">
                            <li>
                                <Link className={location.pathname === ROUTES.DASHBOARD ? "active" : ""} to={ROUTES.DASHBOARD}>
                                    <Flexbox row wrapperStyle={{ justifyContent: 'flex-start' }}>
                                        <Icon width={15} height={15} name="dashboard"></Icon>
                                        <span style={{ marginLeft: 10 }}>Dashboard</span>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.ANALYTICS ? "active" : ""} to={ROUTES.ANALYTICS}>
                                    <Flexbox row wrapperStyle={{ justifyContent: 'flex-start' }}>
                                        <Icon width={15} height={15} name="chart"></Icon>
                                        <span style={{ marginLeft: 10 }}>Analytics</span>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.ACCOUNT ? "active" : ""} to={ROUTES.ACCOUNT}>
                                    <Flexbox row wrapperStyle={{ justifyContent: 'flex-start' }}>
                                        <Icon width={15} height={15} name="help"></Icon>
                                        <span style={{ marginLeft: 10 }}>Help Documents</span>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.ACCOUNT ? "active" : ""} to={ROUTES.ACCOUNT}>
                                    <Flexbox row wrapperStyle={{ justifyContent: 'flex-start' }}>
                                        <Icon width={15} height={15} name="settings"></Icon>
                                        <span style={{ marginLeft: 10 }}>Auctioneer Setting</span>
                                    </Flexbox>
                                </Link>
                            </li>
                        </ul>
                        <Flexbox row spaceBetween>
                            <h3>AUCTIONS</h3>
                            <Icon width={20} height={20} name="plus-circle"></Icon>
                        </Flexbox>
                        <ul>
                            <li>
                                <Link className={location.pathname === ROUTES.UPCOMMING_AUCTION ? "active" : ""} to={ROUTES.UPCOMMING_AUCTION}>
                                    <Flexbox row spaceBetween>
                                        <span>Upcoming Auctions</span>
                                        <Label text={upcomingTotal || 0}></Label>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.PUBLISHED_AUCTION ? "active" : ""} to={ROUTES.PUBLISHED_AUCTION}>
                                    <Flexbox row spaceBetween>
                                        <span>Published Auctions</span>
                                        <Label text="13"></Label>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.AWAITING_RESULTS ? "active" : ""} to={ROUTES.AWAITING_RESULTS}>
                                    <Flexbox row spaceBetween>
                                        <span>Awaiting Results</span>
                                        <Label text={awaitingResults.length}></Label>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.PUBLISHED_AUCTION ? "active" : ""} to={ROUTES.PUBLISHED_AUCTION}>
                                    <Flexbox row spaceBetween>
                                        <span>Completed Auctions</span>
                                        <Label text={completedAuctions.length}></Label>
                                    </Flexbox>
                                </Link>
                            </li>
                        </ul>
                        <h3>INTEGRATION</h3>
                        <ul>
                            <li>
                                <Link className={location.pathname === ROUTES.WAVEBID ? "active" : ""} to={ROUTES.WAVEBID}>
                                    <Flexbox row spaceBetween>
                                        <span>Wavebid</span>
                                        <Label dot background="green"></Label>
                                    </Flexbox>
                                </Link>
                            </li>
                            <li>
                                <Link className={location.pathname === ROUTES.PROXIBID ? "active" : ""} to={ROUTES.PROXIBID}>
                                    <Flexbox row spaceBetween>
                                        <span>Proxibid (Coming soon)</span>
                                    </Flexbox>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            {detail &&
                                <>
                                    <img src={detail.logo} style={{
                                        maxWidth: 120, borderColor: styles.primaryColor
                                        , borderWidth: 1, borderStyle: 'solid', borderRadius: 2
                                    }}></img>
                                    <h4 className="company-name">{detail.company_name}</h4>
                                </>
                            }
                        </div>
                        <Button onClick={this.logout} text="Logout"></Button>
                    </div>
                </Flexbox>
            </div>

        );
    }
}



export function mapStateToProps(state) {
    return {
        detail: state.auctioneer.detail,
        awaitingResults: state.auction.awaiting.list,
        completedAuctions: state.auction.completed.list.filter(item => item.status === AUCTION_STATUS.COMPLETED),
        upcomingTotal: state.auction.upcoming.total,
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Drawer));