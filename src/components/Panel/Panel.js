import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Panel = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        panel: classNames(
            `panel`,
            className
        )
    }
    
    return (
        <div className={classes.panel}>{children}</div>
    );
};

export default Panel;