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
            <div className="app-bar-container paper-toolbar">
                {/* <h1 className="logo">805 - Carwash </h1> */}
                <img className="logo" src={CarwashLogo} style={{ 'width': '84px', 'height':'62px', 'margin-top': '1px' }} />
                {/* <ButtonDewek className="button-log-out"> Keluar</ButtonDewek> */}
            </div>

            <div>
                

            </div>
        </header>
    )
};

export default HeaderCustomer;