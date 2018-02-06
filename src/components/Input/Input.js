import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
    const {
        className,
        children,
        tag: Tag,
        ...attributes
    } = props;
    
    attributes.className = classNames(
        'input',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Input.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Input;