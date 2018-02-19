import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Sidebar = props => {
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

Sidebar.propTypes = {
    size: PropTypes.string,
};

export default Sidebar;