import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuListCustomer = props => {
    const {
        category,
        className,
        children
    } = props;

    const classes = {
        menuList: classNames(
            `menu__list-customer`,
            className
        ),
        menuCategory: classNames(
            `menu__category-customer`
        )
    }

    const tesLi = {
        
        'display':'flex',
        'float': 'left',
        'color': 'magenta'
    }

    return (
        <ul className={classes.menuList}>
        {/* <ul className="menu__listCustomer"> */}
            { category ? <h6 className={classes.menuCategory}>{category}</h6> : null }    
            { children }
        </ul>
    )
};

MenuListCustomer.propTypes = {
    category: PropTypes.string,
};

export default MenuListCustomer;