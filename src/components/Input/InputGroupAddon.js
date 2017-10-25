import React from 'react';

const InputGroupAddon = (props) => {
	const {
		children
	} = props;

	return (
		<div className="input-group-addon">
			{children}
		</div>
	)
};

export default InputGroupAddon;
