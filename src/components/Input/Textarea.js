import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Textarea = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;

    attributes.className = classNames(
        `textarea`,
        className
    )
    
    return <Tag {...attributes}>{children}</Tag>
};

Textarea.defaultProps = {
    tag: 'textarea'
}

Textarea.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Textarea;