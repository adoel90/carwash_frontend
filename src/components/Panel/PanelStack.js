import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelStack = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        panelStack: classNames(
            `panel-stack`,
            className
        )
    }
    
    return <div className={classes.panelStack}>{children}</div>
};

PanelStack.propTypes = {
    
};

export default PanelStack;