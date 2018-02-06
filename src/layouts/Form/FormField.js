import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormField = props => {
    const {
        children,
        className,
        tag: Tag,
        ...attributes
    } = props;

    attributes.className = classNames(
        'form__field',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

FormField.defaultProps = {
    tag: 'div'
}

FormField.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default FormField;