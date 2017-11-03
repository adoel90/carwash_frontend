import React from 'react';
import classNames from 'classnames';

class Form extends React.Component {
	render() {
		const {
			children,
			className,
			...rest
		} = this.props;

		const classes = classNames(
			'form',
			className
		)

		return (
			<form className={classes} {...rest}>
				{children}
			</form>
		);
	}
}

export default Form;
