import React from 'react';
import classNames from 'classnames';

const FormGroup = (props) => {
	const {
		row,
		check,
		children,
		className,
		...rest
	} = props;

	const classes = classNames(
		'form-group',
		row ? 'form-group--row' : null,
		className
	)

	return <div className={classes}>{children}</div>
}

export default FormGroup;
