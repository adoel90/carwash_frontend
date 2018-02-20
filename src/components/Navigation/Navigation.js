import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Navigation = props => {
    const classes = {
        navigation: classNames(
            `navigation`,
            className
        )
    }
    
    return <nav className={classes.navigation}>{children}</nav>
};

Navigation.propTypes = {
    
};

export default Navigation;