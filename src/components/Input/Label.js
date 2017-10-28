import React from 'react';

const Label = (props) => {
	const {
		children,
		className,
		...rest
	} = props;

	return <label>{children}</label>
} 

export default Label;