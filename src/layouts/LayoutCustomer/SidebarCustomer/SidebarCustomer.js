import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SidebarCustomer = props => {
    const {
        size,
        className,
        children,
    } = props;

    const classes = {
        sidebar: classNames(
            `sidebar`,
            size ? `sidebar--${size}` : null,
            className
        ),
        sidebarContainer: classNames(
            `sidebar__container`
        )
    }
    
    return <aside className={classes.sidebar}>{children}</aside>
};

SidebarCustomer.propTypes = {
    size: PropTypes.string,
};

export default SidebarCustomer;