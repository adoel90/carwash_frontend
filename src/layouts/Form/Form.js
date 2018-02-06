import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Form = props => {
    const {
        children,
        className,
        tag: Tag,
        ...attributes
    } = props;
    
    attributes.className = classNames(
        'form',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Form.defaultProps = {
    tag: 'form'
}

Form.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Form;