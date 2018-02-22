import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelHeader = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        panelHeader: classNames(
            `panel__header`,
            className
        )
    }
    
    return <div className={classes.panelHeader}>{children}</div>
};

PanelHeader.propTypes = {
    
};

export default PanelHeader;