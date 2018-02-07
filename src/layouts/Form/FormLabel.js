import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormLabel = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;

    attributes.className = classNames(
        'form__label',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

FormLabel.defaultProps = {
    tag: 'label'
}

FormLabel.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default FormLabel;