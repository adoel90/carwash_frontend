import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { NavLink } from '../../../components/Nav';
import { default as CarwashLogo } from '../../../assets/images/805carwash_white.svg';




const HeaderCustomer = props => {
    const {
        children,
        className,
        handleLogOut,
        isAuthenticated,
        member
    } = props;  
    
    return( 
        
        <header className="app-bar promote-layer paper-toolbar paper-shadow">
            <div className="app-bar-container paper-toolbar flex justify-content--center">
                <img className="logo" src={CarwashLogo} style={{width: "150px"}} />
            </div>
        </header>
    )
};

export default HeaderCustomer;