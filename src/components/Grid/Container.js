import React from 'react';
import classNames from 'classnames';

const Container = (props) => {
	const {
		children,
		className
	} = props;

	const classes = classNames(
		'container',
		className
	);

	return <div className={classes}>{children}</div>
}

export default Container;