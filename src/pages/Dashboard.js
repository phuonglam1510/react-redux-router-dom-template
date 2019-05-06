import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../components/Card';
import { Route, Link, withRouter } from "react-router-dom";
import ReactPlaceholder from 'react-placeholder';
import _ from 'lodash';
import '../styles/Dashboard.scss';
import Flexbox from '../components/Flexbox';
import { listUsers } from '../actions/userAction';
import { ROUTES } from '../constants/ROUTES';

class Dashboard extends Component {
    state = {
    }
    componentDidMount() {
        this.props.listUsers();
    }
    detail = (user) => {
        const { history } = this.props;
        history.push(ROUTES.DETAIL + "/" + user.login, { transition: 'in' });
    }
    render() {
        const { loading, users, refreshing, message } = this.props;
        return (
            <div className="dashboard-page" style={{ padding: 20 }}>
                <Flexbox row spaceBetween>
                    <h1>List users</h1>
                    <div>
                        {refreshing && <div style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Refreshing...</div>}
                    </div>
                </Flexbox>
                <hr />
                {loading ?
                    _.range(0, 3).map(n => (<Card noPadding shadow containerStyle={{ marginBottom: 10, padding: 10 }} key={n}>
                        <Flexbox row containerStyle={{ justifyContent: 'flex-start' }}>
                            <ReactPlaceholder showLoadingAnimation={true} type='round' ready={false} color='#E0E0E0' style={{ width: 50, height: 50, marginRight: 10 }}><div></div></ReactPlaceholder>
                            <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} style={{ width: '50%' }} rows={3} color='#E0E0E0'><div></div></ReactPlaceholder>
                        </Flexbox>
                    </Card>)) :
                    message.length > 0 ?
                        <div className="error">
                            {message}
                        </div>
                        :
                        users.map(user =>
                            <div onClick={() => this.detail(user)} key={user.id}>
                                <Card noPadding shadow containerStyle={{ marginBottom: 10, padding: 10 }} >
                                    <Flexbox row containerStyle={{ justifyContent: 'flex-start' }}>
                                        <div className="avatar">
                                            <img src={user.avatar_url} />
                                        </div>
                                        <div className="name">
                                            {user.login}
                                        </div>
                                    </Flexbox>
                                </Card>
                            </div>)
                }
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        users: state.user.list,
        loading: state.user.loading,
        refreshing: state.user.refreshing,
        message: state.user.message
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        listUsers
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));