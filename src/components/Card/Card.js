import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;

    attributes.className = classNames(
        'card',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Card.defaultProps = {
    tag: 'div'
}

Card.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Card;