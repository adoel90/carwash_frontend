import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Select = props => {
    const {
        children,
        className,
        ...attributes
    } = props;

    const classes = {
        select: classNames(
            `select`,
            className
        )
    }
    

    return (
        <select {...attributes} className={classes.select}>
            {children}
        </select>
    )
    
};

export default Select;