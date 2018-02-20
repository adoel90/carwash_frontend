import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PaginationItem = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        paginationItem: classNames(
            `pagination__item`,
            className
        )
    }
    
    return <li className={classes.paginationItem}></li>
};

PaginationItem.propTypes = {
    
};

export default PaginationItem;