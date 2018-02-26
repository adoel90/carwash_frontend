import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ModalFooter = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        modalFooter: classNames(
            `modal__footer`,
            className
        )
    }
    
    return <div className={classes.modalFooter}>{children}</div>
};

ModalFooter.propTypes = {
    
};

export default ModalFooter;