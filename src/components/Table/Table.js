import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = props => {
    const {
        theme,
        className,
        children
    } = props;

    const classes = {
        table: classNames(
            `table`,
            theme ? `table--${theme}` : null,
            className
        )
    }

    return (
        <div className={classes.table}>
            <table>{children}</table>
        </div>
    )
};

Table.propTypes = {
    theme: PropTypes.string,
};

export default Table;