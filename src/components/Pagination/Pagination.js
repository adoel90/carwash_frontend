import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Pagination = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        pagination: classNames(
            `pagination`,
            className
        )
    }
    
    return <div className={classes.pagination}>{children}</div>
};

Pagination.propTypes = {
    
};

export default Pagination;