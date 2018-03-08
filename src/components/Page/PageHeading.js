import React from 'react';
import classNames from 'classnames';

const PageHeading = (props) => {
	const {
		children,
		className
	} = props;

	const classes = classNames(
		'page__heading',
		className
	)

	return <div className={classes}>{children}</div>;
}

export default PageHeading;