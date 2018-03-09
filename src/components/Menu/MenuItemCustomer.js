import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuItemCustomer = props => {
    const {
        active,
        className,
        children
    } = props;

    const classes = {
        menuItem: classNames(
            `menu__item`,
            active ? `menu__item--is-active` : null,
            className
        )
    }
    
    return <li className={classes.menuItem}>{children}</li>
};

MenuItemCustomer.propTypes = {
    active: PropTypes.bool
};

export default MenuItemCustomer;