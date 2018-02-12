import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Menu = props => {
    const {
        tag: Tag,
        theme,
        aside,
        children,
        className,
        ...attributes
    } = props;

    attributes.className = classNames(
        `menu`,
        theme ? `menu--${theme}` : null,
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Menu.defaultProps = {
    tag: 'div'
}

Menu.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
    theme: PropTypes.string,
};

export default Menu;