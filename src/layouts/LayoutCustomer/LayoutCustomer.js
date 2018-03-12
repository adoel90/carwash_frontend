import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LayoutCustomer = props => {
    const {
        children,
        className
    } = props;  

    const classes = {
        layout: classNames(
            `navigation`,
            className
        )
    }
    
    return (
    
        <main className={classes.layout}>{children}</main>
    )
};

export default LayoutCustomer;