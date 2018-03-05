import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => {
	const {
		tag: Tag,
		theme,
		size,
		outlined,
		rounded,
		block,
		children,
		className,
		...attributes
	} = props;

	attributes.className = classNames('button', theme ? `button--${theme}` : null,
												size ? `button--${size}` : null,
		rounded ? `button--rounded` : null,
		block ? 'button--block' : null,
		outlined ? 'button--outlined' : null,
		className
	)

	return <Tag {...attributes}>{children}</Tag>
};

Button.defaultProps = {
	tag: 'button',
	theme: 'primary'
}

Button.propTypes = {
	
	tag: PropTypes.oneOfType([
		PropTypes.func, PropTypes.string,
	]),
	theme: PropTypes.string,
	size: PropTypes.string,
	block: PropTypes.bool,
	outlined: PropTypes.bool,
	rounded: PropTypes.bool,
};

export default Button;