import React from 'react';
import classNames from 'classnames';

const ModalHeader = (props) => {
	const {
		align,
		className,
		children
	} = props;

	const classes = classNames(
		'modal__header',
		`ta-${align}`
	)

	return <div className={classes}>{children}</div>
}

export default ModalHeader;
