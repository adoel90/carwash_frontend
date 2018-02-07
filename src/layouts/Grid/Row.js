import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Row = (props) => {
	const {
		tag: Tag,
		gutterless,
		children,
		className,
		...attributes,
	} = props;

	attributes.className = classNames(
		'row',
		gutterless ? `row--gutterless` : null,
		className
	);

	return <Tag {...attributes}>{children}</Tag>
}

Row.defaultProps = {
	tag: 'div'
}

Row.propTypes = {
	tag: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string,
	]),
	gutterless: PropTypes.bool,
}

export default Row;
