import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
import Account from './Account';
import { Route, Link, Switch } from "react-router-dom";
import Header from '../components/Header';
import Flexbox from '../components/Flexbox';
import PrivateRoute from '../components/PrivateRoute';
import styles from '../styles/Colors.scss';
import Drawer from '../components/Drawer';
import { ROUTES } from '../constants/ROUTES';
import EventEmitter from '../EventEmitter';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/authAction';
import { detail } from '../actions/auctioneerAction';
import NewAuction from './NewAuction';
import UpcomingAuctions from './UpcomingAuctions';
import AwaitingResults from './AwaitingResults';
import SubmitResults from './SubmitResult';
import Analytics from './Analytics';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AuctionDetail from './AuctionDetail';

class Home extends Component {
    constructor(props) {
        super(props);
        const { history } = props;

        console.log("Subcribe in home");
        EventEmitter.on("session_timeout", () => {
            history.push("/login", {});
            props.logout();
        });

        this.props.detail();
    }
    componentWillUnmount() {
        console.log("unsubscribe...");
        EventEmitter.off("session_timeout");
    }
    render() {
        const { location } = this.props;
        const { state } = location;
        const { transition } = state || {};
        console.log(location);
        return (
            <div style={{ display: 'relative', height: '100vh' }}>
                <Header />
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        timeout={transition ? 300 : 0}
                        classNames="page"
                        unmountOnExit
                    >
                        <Switch location={location}>
                            <PrivateRoute className={transition === 'out' ? "out-transition" : (transition === 'in' ? "in-transition" : "")}
                                exact path={ROUTES.AWAITING_RESULTS + '/:auctionId'} component={SubmitResults} />
                            <PrivateRoute className={transition === 'out' ? "out-transition" : (transition === 'in' ? "in-transition" : "")}
                                exact path={ROUTES.UPCOMMING_AUCTION + '/:auctionId'} component={AuctionDetail} />
                            <Route render={() => (
                                <div className={transition === 'out' ? "out-transition" :
                                    (transition === 'in' ? "in-transition" : "")}>
                                    <Flexbox row spaceBetween wrapperStyle={{ alignItems: 'stretch', backgroundColor: styles.lightGrayColor }}>
                                        < div style={{ flex: 1, height: 'calc(100vh - 70px)' }}>
                                            <Drawer></Drawer>
                                        </div>
                                        <div style={{ flex: 4 }}>
                                            <PrivateRoute exact path={ROUTES.NEW_AUCTION} component={NewAuction} />
                                            <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
                                            <PrivateRoute exact path={ROUTES.UPCOMMING_AUCTION} component={UpcomingAuctions} />
                                            <PrivateRoute exact path={ROUTES.ANALYTICS} component={Analytics} />
                                            <PrivateRoute exact path={ROUTES.AWAITING_RESULTS} component={AwaitingResults} />
                                            <PrivateRoute exact path={ROUTES.PUBLISHED_AUCTION} component={AwaitingResults} />
                                            <PrivateRoute path={ROUTES.ACCOUNT} component={Account} />

                                        </div>
                                    </Flexbox>
                                </div>
                            )}></Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>


            </div >
        );
    }
}

export function mapStateToProps(state) {
    return {};
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout,
        detail
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));