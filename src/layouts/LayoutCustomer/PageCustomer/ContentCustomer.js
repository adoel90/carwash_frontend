import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ContentCustomer = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        content: classNames(
            `content-customer`,
            className
        )
    }
    
    return <div className={classes.content}>{children}</div>
};

export default ContentCustomer;