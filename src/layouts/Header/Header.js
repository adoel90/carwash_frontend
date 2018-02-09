import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = props => {
    const {
        children,
        block,
        className
    } = props;

    const classes = {
        header: classNames(
            'header', 
            className
        ),
        headerContainer: classNames(
            `header__container`,
            `header__container${block ? '--block' : null}`
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

Header.defaultProps = {
    block: false
}

Header.propTypes = {
    block: PropTypes.bool,
}

export default Header;