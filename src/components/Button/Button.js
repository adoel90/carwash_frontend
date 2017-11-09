import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class Button extends React.Component {
	render() {
		const {
			buttonTheme,
			buttonSize,
			buttonOutline,
			buttonFull,
			children,
			className,
			...rest
		} = this.props;

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
}

export default Button;
