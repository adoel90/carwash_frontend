import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ModalHeader = props => {
    const {
        theme,
        className,
        children
    } = props;

    const classes = {
        modalHeader: classNames(
            `modal__header`,
            theme ? `modal__header--${theme}` : null,
            className
        )
    }
    
    return <div className={classes.modalHeader}>{children}</div>
};

ModalHeader.defaultProps = {
    theme: 'primary'
}

ModalHeader.propTypes = {
    theme: PropTypes.string,
};

export default ModalHeader;