import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/pages/Account.scss';
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
        const { user } = this.props;
        return (
            <div className="account-page" style={{ padding: 20 }}>
                <Card containerStyle={{ padding: 25 }} shadow>
                    <Flexbox row spaceBetween>
                        <h1>Auctioneer Settings</h1>
                        <Button text="Update"></Button>
                    </Flexbox>
                    <hr />
                    <Flexbox row>
                        <div style={{ flex: 1, alignSelf: 'flex-start', marginRight: 10 }}>
                            <h3>BASIC INFORMATION</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div style={{ flex: 2 }}>
                            <Input label="AUCTION NAME"></Input>
                            <Flexbox row>
                                <Input containerStyle={{ flex: 1, marginRight: 10 }} label="DATE"></Input>
                                <Input containerStyle={{ flex: 1, marginRight: 10 }} label="TIME"></Input>
                                <Input containerStyle={{ flex: 1 }} label="TIMEZONE"></Input>
                            </Flexbox>
                            <Input label="AUCTION TYPE"></Input>
                            <Input label="AUCTION LISTING URL" placeholder="http://example.com"></Input>
                        </div>
                    </Flexbox>
                    <hr />
                    <Flexbox row>
                        <div style={{ flex: 1, alignSelf: 'flex-start', marginRight: 10 }}>
                            <h3>BILLING DETAILS</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                        <div style={{ flex: 2 }}>
                            <Input label="LOCATION NAME"></Input>
                            <Input label="ADDRESS" placeholder="Search Address"></Input>
                            <Input label="ZIP CODE" ></Input>

                        </div>
                    </Flexbox>
                    <hr style={{ marginTop: 20 }} />
                    <Flexbox row spaceBetween>
                        <div></div>
                        <Button text="Update"></Button>
                    </Flexbox>
                </Card>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);