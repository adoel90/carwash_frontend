import React from 'react';
import classNames from 'classnames';

const Button = (props) => {
	const {
		buttonType,
		buttonStyle,
		buttonSize,
		buttonFull,
		children,
		className,
		...rest,
	} = props;

	const classes = classNames(
		'button',
		buttonStyle ? `button--${buttonStyle}` : null,
		buttonSize ? `button--${buttonSize}` : null,
		buttonFull ? 'button--full' : null
	)

	return (
		<button type={buttonType} className={classes}>
			{ children }
		</button>
	)
}

export default Button;
