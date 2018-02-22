import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

const ButtonGroup = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        buttonGroup: classNames(
            `button-group`,
            className
        )
    }
    
    return <div className={classes.buttonGroup}>{children}</div>
};

ButtonGroup.propTypes = {
    
};

export default ButtonGroup;