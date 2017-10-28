import React from 'react';

const PageContent = (props) => {
	const {
		children,
		className,
		...rest
	} = props;

	return <div className="page__content">{children}</div>
}

export default PageContent;