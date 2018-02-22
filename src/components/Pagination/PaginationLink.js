import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PaginationLink = props => {
    const {
        active,
        previous,
        next,
        disabled,
        className,
        children,
        ...attributes
    } = props;
    
    const classes = {
        paginationLink: classNames(
            `pagination__link`,
            active ? `pagination__link--active` : null,
            previous ? `pagination__link--previous` : null,
            next ? `pagination__link--next` : null,
            disabled ? `pagination__link--disabled` : null,
            className
        )
    }
    
    return <a {...attributes} className={classes.paginationLink}>{children}</a>
};

PaginationLink.propTypes = {
    previous: PropTypes.bool,
    next: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default PaginationLink;