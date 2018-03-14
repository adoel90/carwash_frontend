import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { NavLink } from '../../../components/Nav';




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
                <h1 className="logo">805 - Carwash </h1>
                <ButtonDewek className="button-log-out"> Keluar</ButtonDewek>

                {/* <NavLink className="button-log-out" to="/logout">Keluar</NavLink> */}

                 {/* ||  onClick={(e)=> handleLogOut(e)}  */}
            </div>

            <div>
                

            </div>
        </header>
    )
};

export default HeaderCustomer;