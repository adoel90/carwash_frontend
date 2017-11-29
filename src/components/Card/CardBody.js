import React from 'react';
import classNames from 'classnames';

const CardBody = (props) => {
	const { children, className } = props;
	const classes = classNames(
		'card__body',
		className
	)

	return <div className={classes}>{children}</div>
}

export default CardBody;
