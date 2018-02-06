import React from 'react';
import classNames from 'classnames';

const Row = (props) => {
	const {
		children,
		className
	} = props;

	const classes = classNames(
		'row',
		className
	)


	return <div className={classes}>{children}</div>
}

export default Row;
