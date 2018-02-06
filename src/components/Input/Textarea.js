import React from 'react';
import PropTypes from 'prop-types';

const Textarea = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;
    
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