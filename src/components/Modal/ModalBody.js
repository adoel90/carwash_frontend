import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ModalBody = props => {
    const {
        className,
        children
    } = props;

    const classes = {
        modalBody: classNames(
            `modal__body`,
            className
        )
    }
    
    return <div className={classes.modalBody}>{children}</div>
};

ModalBody.propTypes = {
    
};

export default ModalBody;