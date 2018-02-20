import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Panel = props => {
    const {
        theme,
        children,
        className
    } = props;

    const classes = {
        panel: classNames(
            `panel`,
            theme ? `panel--${theme}` : null,
            className
        )
    }
    
    return <div className={classes.panel}>{children}</div>
};

Panel.propTypes = {
    theme: PropTypes.string,
}

export default Panel;