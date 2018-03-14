import React from 'react';
import classNames from 'classnames';

const CardHeading = (props) => {
	const { 
		align,
		children,
		className 
	} = props;

	const classes = classNames(
		'card__heading',
		align ? `ta-${align}` : null,
		className
	)

	return <div className={classes}>{children}</div>
}

export default CardHeading;
