import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MenuList = props => {
    const {
        tag: Tag,
        children,
        className,
        ...attributes
    } = props;

    attributes.className = classNames(
        `menu__list`,
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

MenuList.defaultProps = {
    tag: 'div'
}

MenuList.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default MenuList;