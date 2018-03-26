import React from 'react';
import classNames from 'classnames';

const Label = (props) => {
	const {
		children,
		className,
		...rest
	} = props;

	const classes = classNames(
		'form-label',
		className
	)


	return <label className={classes}>{children}</label>
}

export default Label;