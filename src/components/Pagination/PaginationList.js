import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PaginationList = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        paginationList: classNames(
            `pagination__list`,
            className
        )
    }
    
    return <ul className={classes.paginationList}>{children}</ul>
};

PaginationList.propTypes = {
    
};

export default PaginationList;