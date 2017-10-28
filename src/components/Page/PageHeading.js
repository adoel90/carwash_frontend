import React from 'react';

const PageHeading = (props) => {
	const {
		children,
		className,
		...rest
	} = props;

	return <div className="page__heading">{children}</div>;
}

export default PageHeading;