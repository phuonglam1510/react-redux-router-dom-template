import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isAuthenticated } from "../apis/authApi";

export default class PrivateRoute extends Component {
    render() {
        const { component: Component, className, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated() ? (
                        <Component {...props} className={className} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        );
    }
}
