import React from 'react';
import classNames from 'classnames';

const ModalFooter = (props) => {
	const {
		children,
		className
	} = props;

	const classes = classNames(
		'modal__footer',
		className
	)

	return <div className={classes}>{children}</div>

}

export default ModalFooter;
