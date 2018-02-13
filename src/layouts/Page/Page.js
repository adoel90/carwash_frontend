import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Page = props => {
    const {
        className,
        children
    } = props;
    
    const classes = {
        page: classNames(
            `page`,
            className
        )
    }
    
    return <main className={classes.page}>{children}</main>
};

export default Page;