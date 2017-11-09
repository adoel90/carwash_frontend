import React from 'react';
import classNames from 'classnames';

const ModalContent = (props) => {
	const {
		children,
		className
	} = props;

	const classes = classNames(
		'modal__content',
		className
	)

	return <div className={classes}>{children}</div>
}

export default ModalContent;
