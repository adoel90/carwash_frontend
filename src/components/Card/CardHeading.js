import React from 'react';

const CardHeading = (props) => {
	const { children } = props;

	return <div className="card__heading">{children}</div>
}

export default CardHeading;
