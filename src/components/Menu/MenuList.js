import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuList = props => {
    const {
        category,
        className,
        children
    } = props;

    const classes = {
        menuList: classNames(
            `menu__list`,
            className
        ),
        menuCategory: classNames(
            `menu__category`
        )
    }

    return (
        <ul className={classes.menuList}>
            { category ? <h6 className={classes.menuCategory}>{category}</h6> : null }
            { children }
        </ul>
    )
};

MenuList.propTypes = {
    category: PropTypes.string,
};

export default MenuList;