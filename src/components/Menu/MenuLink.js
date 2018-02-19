import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuLink = props => {
    const {
        className,
        children,
        ...attributes
    } = props;

    const classes = {
        menuLink: classNames(
            `menu__link`,
            className
        )
    }
    
    return <NavLink {...attributes} className={classes.menuLink}>{children}</NavLink>
};

MenuLink.propTypes = {
    
};

export default MenuLink;