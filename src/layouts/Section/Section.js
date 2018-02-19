import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Section = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        section: classNames(
            `section`,
            className
        )
    }
    
    return <section className={classes.section}>{children}</section>
};

export default Section;