import React, { Component } from 'react';
import classNames from 'classnames';

const FormGroup = (props) => {
	const {
		children,
		className,
		row,
	} = props;

	const classes = classNames(
		className,
		'form-group',
		row ? 'row' : false
	)

	return (
		<div className={classes}>
			{children}
		</div>
	);
}

export default FormGroup;
