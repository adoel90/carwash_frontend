import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = props => {
    const {
        block,
        children,
        className
    } = props;

    const classes = {
        header: classNames(
            'header', 
            className
        ),
        headerContainer: classNames(
            `header__container`,
            block ? `header__container--block` : null
        )
    }
    
    return (
        <header className={classes.header}>
            <div className={classes.headerContainer}>
                {children}
            </div>
        </header>
    )
};

export default Header;