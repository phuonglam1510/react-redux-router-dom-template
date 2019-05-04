import React, { Component } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { login } from '../actions/authAction';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../components/Card';
import Flexbox from '../components/Flexbox';
import styles from '../styles/Colors.scss';
// import '../styles/Header.scss';

class Login extends Component {
    state = {
        message: ""
    }
    login = async () => {
        const { email, password } = this.state;
        const { history } = this.props;

        this.setState({ loading: true });
        var result = await this.props.login(email, password);
        this.setState({ loading: false });
        if (result.data) {
            history.push('/app');
        } else {
            this.setState({ message: result.error });
        }
    }
    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }
    render() {
        const { email, location, password, message, loading } = this.state;
        let from = location && location.state ? location.state.from.pathname : '/';
        return (
            <div style={{ backgroundColor: styles.primaryColor, paddingTop: 50, height: '100vh' }}>
                <h1 style={{ textAlign: 'center', color: 'white', marginTop: 40 }}>TRACTOR ZOOM</h1>
                <h2 style={{ textAlign: 'center', color: 'white' }}><i>Auctioneer Portal</i></h2>
                <Flexbox padding={40}>
                    <Card minWidth={360}>
                        <Input value={email} name='email' onChange={this.handleChange} label={"EMAIL ADDRESS"}></Input>
                        <Input password value={password} name='password' onChange={this.handleChange} label={"PASSWORD"}></Input>
                        {message.length > 0 && <div style={{ color: styles.redColor, marginTop: 10 }}>{message}</div>}
                        <Flexbox wrapperStyle={{ marginTop: 10 }} row spaceBetween>
                            <a>Forgot Password?</a>
                            <Button loading={loading} onClick={this.login} text="LOGIN"></Button>
                        </Flexbox>
                    </Card>
                </Flexbox>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}
export function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login
    }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));