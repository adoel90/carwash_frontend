import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from '../../../components/Nav';
import { default as CarwashLogo } from '../../../assets/images/805carwash_white.svg';

const HeaderCustomer = props => {
    const {
        children,
        className,
        handleLogOut,
        isAuthenticated,
        member,
        logoutMember
    } = props;
    
    return( 
        
        <header className="app-bar promote-layer paper-toolbar paper-shadow">
            <div className="flex justify-content--space-between align-items--center">
                <div className="app-bar-container paper-toolbar flex justify-content--center">
                    <img className="logo" src={CarwashLogo} style={{width: "150px"}} />
                </div>
                <div className="margin-right-large">
                    <i className="fas fa-power-off" onClick={() => logoutMember()} style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                </div>
            </div>
        </header>
    )
};

export default HeaderCustomer;