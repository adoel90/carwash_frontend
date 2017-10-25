import React from 'react';
import classNames from 'classnames';

class Form extends React.Component {
	render() {
		const {
			children,
			className
		} = this.props;

		const classes = classNames(
			'form',
			className
		)

		return (
			<form className={classes}>
				{children}
			</form>
		);
	}
}

export default Form;
