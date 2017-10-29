import React from 'react';
import classNames from 'classnames';

const Button = (props) => {
	const {
		buttonStyle,
		buttonSize,
		buttonFull,
		children,
		className,
		...rest
	} = props;

	const classes = classNames(
		'button',
		buttonStyle ? `button--${buttonStyle}` : null,
		buttonSize ? `button--${buttonSize}` : null,
		buttonFull ? 'button--full' : null,
		className
	)

	return (
		<button {...rest} className={classes}>
			{ children }
		</button>
	)
}

export default Button;
