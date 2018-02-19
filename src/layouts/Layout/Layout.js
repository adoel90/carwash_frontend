import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Layout = props => {
    const {
        children,
        className
    } = props;  

    const classes = {
        layout: classNames(
            `layout`,
            className
        )
    }
    
    return <main className={classes.layout}>{children}</main>
};

export default Layout;