import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from "react-router-dom";

import '../styles/pages/Detail.scss';
import ReactPlaceholder from 'react-placeholder';
import Label from '../components/Label';
import Flexbox from '../components/Flexbox';
import Icon from '../components/Icon';
import { detail } from '../apis/userApi';
import helpers from '../helpers';
import { UNKNOWN_ERROR } from '../constants/MESSAGE';
import { ROUTES } from '../constants/ROUTES';

class Detail extends Component {
    state = {
        loading: false,
        user: {}
    }
    componentDidMount() {
        this.load();
    }
    load = async () => {
        const { match } = this.props;
        console.log(match);
        try {
            this.setState({ loading: true });
            const resp = await detail(match.params.username);
            const user = helpers.apiSerializer(resp);
            this.setState({ loading: false, user });
        } catch (error) {
            console.error(error);
            this.setState({ loading: false, message: error.message || UNKNOWN_ERROR });
        }
    }
    render() {
        const { user, loading } = this.state;
        const { className } = this.props;
        return (
            <div className={"detail-page" + (className ? " " + className : "")} style={{ padding: 20 }}>
                <Link to={{ pathname: ROUTES.DASHBOARD, state: { transition: 'out' } }}>
                    <div className="back-btn" >
                        <Flexbox row flexStart containerStyle={{ width: 100, borderRadius: 4 }}>
                            <Icon name='back' ></Icon>
                            <div>HOME</div>
                        </Flexbox>
                    </div>
                </Link>
                <div>
                    {loading ?
                        <>
                            <ReactPlaceholder showLoadingAnimation={true} type='rect' ready={false} color='#E0E0E0' style={{ width: 100, height: 100 }}><div></div></ReactPlaceholder>
                            <ReactPlaceholder showLoadingAnimation={true} type='text' ready={false} style={{ width: '50%' }} rows={3} color='#E0E0E0'><div></div></ReactPlaceholder>
                        </>
                        :
                        <div>
                            <img src={user.avatar_url}></img>
                            <div>{user.name}</div>
                            <div>{user.login}</div>
                            <div>
                                <Label containerStyle={{ marginRight: 10 }} text={user.following + ' Following'} ></Label>
                                <Label containerStyle={{ marginRight: 10 }} text={user.followers + ' Follower'} ></Label>
                                <Label text={user.public_repos + ' Repositories'} ></Label>
                            </div>
                        </div>}
                </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));