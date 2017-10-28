import React from 'react';

const Row = (props) => {
	const {
		children,
		className
	} = props;

	return <div className="row">{children}</div>
}

export default Row;