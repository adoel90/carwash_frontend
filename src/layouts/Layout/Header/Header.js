import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        header: classNames(
            'header', 
            className
        ),
        headerContainer: classNames(
            `header__container`
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