import React from 'react';
import classNames from 'classnames';

const Input = (props) => {
	const {
		className,
		tag,
		type,
		...attributes
	} = props;

	const classes = classNames(
		'form-control',
		className
	)

	return <input className={classes} {...attributes} />;
}

export default Input;
