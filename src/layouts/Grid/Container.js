import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = (props) => {
	const {
		tag: Tag,
		block,
		children,
		className,
		...attributes,
	} = props;

	attributes.className = classNames(
		`container`,
		block ? `container--block` : null,
		className
	);

	return <Tag {...attributes}>{children}</Tag>
}

Container.defaultProps = {
	tag: 'div'
}

Container.propTypes = {
	tag: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string,
	]),
}

export default Container;
