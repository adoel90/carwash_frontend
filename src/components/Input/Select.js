import React from 'react';
import PropTypes from 'prop-types';

const Select = props => {
    const {
        tag: Tag,
        children,
        className,
        ...attributes
    } = props;
    
    return <Tag {...attributes}>{children}</Tag>
};

Select.defaultProps = {
    tag: 'select'
}

Select.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Select;