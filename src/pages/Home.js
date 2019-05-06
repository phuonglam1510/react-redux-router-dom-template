import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dashboard from './Dashboard';
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
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Detail from './Detail';
import About from './About';

class Home extends Component {
    constructor(props) {
        super(props);
        const { history } = props;

        console.log("Subcribe in home");
        EventEmitter.on("session_timeout", () => {
            history.push("/login", {});
            props.logout();
        });

        // this.props.detail();
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
                                exact path={ROUTES.DETAIL + '/:username'} component={Detail} />
                            <Route render={() => (
                                <div className={transition === 'out' ? "out-transition" :
                                    (transition === 'in' ? "in-transition" : "")}>
                                    <Flexbox row spaceBetween containerStyle={{ alignItems: 'stretch', backgroundColor: styles.lightGrayColor }}>
                                        < div style={{ flex: 1, height: 'calc(100vh - 70px)' }}>
                                            <Drawer></Drawer>
                                        </div>
                                        <div style={{ flex: 4 }}>
                                            <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
                                            <PrivateRoute path={ROUTES.ABOUT} component={About} />

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
        // detail
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));