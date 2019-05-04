
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { detail } from '../actions/auctioneerAction';
import Header from '../components/Header';
import Button from '../components/Button';
import styles from '../styles/Colors.scss';
import { ROUTES } from '../constants/ROUTES';

class NotFound extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <div style={{}}>
                <Header noRight></Header>
                <div style={{ textAlign: 'center', height: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <div>
                        <h1 style={{ marginBottom: 20, textTransform: 'uppercase', color: styles.grayBlueColor, opacity: .6 }}>Page Not Found</h1>
                        <Link to={ROUTES.DASHBOARD}>
                            <Button text="Back Home"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {};
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        detail
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotFound));