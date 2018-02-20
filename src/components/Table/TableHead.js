import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableHead = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        tableHead: classNames(
            `table__head`,
            className
        )
    }
    
    return <thead className={classes.tableHead}>{children}</thead>
};

TableHead.propTypes = {
    
};

export default TableHead;