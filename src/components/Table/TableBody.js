import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableBody = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        tableBody: classNames(
            `table__body`,
            className
        )
    }
    
    return <tbody className={classes.tableBody}>{children}</tbody>
};


TableBody.propTypes = {
    
};


export default TableBody;