import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Sidebar = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;

    attributes.className = classNames(
        `sidebar`,
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Sidebar.defaultProps = {
    tag: 'aside'
}

Sidebar.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Sidebar;