import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from '../../../components/Nav';
import { default as CarwashLogo } from '../../../assets/images/805carwash_white.svg';
import Currency from '../../../components/Currency';

const HeaderCustomer = props => {
    const {
        children,
        className,
        handleLogOut,
        isAuthenticated,
        member,
        logoutMember,
        memberData
    } = props;

    return( 
        
        <header className="app-bar promote-layer paper-toolbar paper-shadow">
            {/* <span className="justify-content--left customer-header">{memberData.name}</span> */}
            <div className="flex justify-content--space-between align-items--center">
                
                {/* <div className="margin-left-small" style={{width: "150px"}}>
                {memberData.name}
                </div> */}

                <div className="app-bar-container paper-toolbar flex justify-content--left">  
                    <img className="logo" src={CarwashLogo} style={{width: "150px"}} />
                </div>
                {/* <div className="margin-right-small" style={{width: "100px"}}>
                    {memberData.name}
                </div> */}
                <div className="margin-right-small" style={{width: "370px"}}>
                    <b>{memberData.name},</b> <Currency value={ memberData.balance} />
                </div>
                <div className="margin-right-large">
                    <i className="fas fa-power-off" onClick={() => logoutMember()} style={{ fontSize: '24px', cursor: 'pointer' }}></i>
                </div>
              
            </div>
        </header>
    )
};

export default HeaderCustomer;