import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = props => {
    const {
        theme,
        size,
        fullWidth,
        striped,
        className,
        children
    } = props;

    const classes = {
        table: classNames(
            `table`,
            theme ? `table--${theme}` : null,
            size ? `table--${size}` : null,
            fullWidth ? `table--full-width` : null,
            striped ? `table--striped` : null,
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
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
};

export default Table;