import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Column = props => {
    const {
        tag: Tag,
        sizes,
        className,
        children,
        ...attributes
    } = props;

    let columnClasses = [];

    sizes.forEach((size, i) => {
        if(size in props) {
            delete attributes[size];
            columnClasses.push(`column-${size}-${props[size]}`);
        }
    })

    attributes.className = classNames(
        className,
        'column',
        columnClasses,
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

Column.defaultProps = {
    tag: 'div',
    sizes: sizes
}

Column.propTypes = {
    sizes: PropTypes.array,
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]).isRequired,
    xs: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
    ]),
    sm: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
    ]),
    md: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
    ]),
    lg: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
    ]),
    xl: PropTypes.oneOfType([
        PropTypes.number, PropTypes.string,
    ]),
};

export default Column;