import React from 'react';
import classNames from 'classnames';

const Button = (props) => {
	const {
		buttonTheme,
		buttonSize,
		buttonOutline,
		buttonFull,
		children,
		className,
		...rest
	} = props;

	const classes = classNames(
		'button',
		buttonTheme ? `button--${buttonTheme}` : null,
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
