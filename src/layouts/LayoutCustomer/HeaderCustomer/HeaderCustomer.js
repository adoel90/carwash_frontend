import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HeaderCustomer = props => {
    const {
        children,
        className
    } = props;  
    
    return( 
        
        <header className="app-bar promote-layer paper-toolbar paper-shadow">
            <div className="app-bar-container paper-toolbar">
                <h1 className="logo">805 - Carwash </h1>
            </div>
        </header>
    )
};

export default HeaderCustomer;