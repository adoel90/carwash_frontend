import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelBody = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        panelBody: classNames(
            `panel__body`,
            className
        )
    }
    
    return <div className={classes.panelBody}>{children}</div>
};

export default PanelBody;