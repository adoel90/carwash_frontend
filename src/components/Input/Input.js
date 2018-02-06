import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

Input.defaultProps = {
    tag: 'input'
}

Input.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Input;