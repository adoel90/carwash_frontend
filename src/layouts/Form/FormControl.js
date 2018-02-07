import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormControl = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;
    
    attributes.className = classNames(
        'form__control',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

FormControl.defaultProps = {
    tag: 'div'
}

FormControl.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default FormControl;