import React from 'react';
import classNames from 'classnames';

const Container = (props) => {
	const {
		children,
		className,
		...rest
	} = props;

	const classes = classNames(
		'container',
		className
	);

	return <div className={classes} {...rest}>{children}</div>
}

export default Container;
