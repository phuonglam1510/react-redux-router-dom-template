import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/Colors.scss';

import '../styles/Header.scss';
import Flexbox from './Flexbox';
import Button from './Button';
import { ROUTES } from '../constants/ROUTES';

class Header extends Component {
    render() {
        const { noRight } = this.props;
        return (
            <div className="header-container">
                <Flexbox row spaceBetween>
                    <h2>Demo</h2>
                    {!noRight &&
                        <Link to={ROUTES.LOGIN}>
                            <Button backgroundColor="white" textColor={styles.primaryColor} text="Logout"></Button>
                        </Link>}
                </Flexbox>
            </div>
        );
    }
}

export default Header;
