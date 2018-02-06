import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Column = props => {
    const {
        className,
        children,
        tag: Tag,
        ...attributes
    } = props;
    
    return <Tag {...attributes}>{children}</Tag>
};

Column.defaultProps = {
    tag: 'div'
}

Column.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Column;