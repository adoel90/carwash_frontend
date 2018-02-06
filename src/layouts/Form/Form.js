import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Form = props => {
    const {
        tag: Tag,
        children,
        className,
        layout,
        ...attributes
    } = props;
    
    attributes.className = classNames(
        'form',
        layout ? `form--${layout}` : null,
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Form.defaultProps = {
    tag: 'form',
    layout: 'horizontal'
}

Form.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
    layout: PropTypes.string,
};

export default Form;