import React from 'react';

const ModalHeader = (props) => {
	const {
		children
	} = props;

	return <div className="modal__header">{children}</div>
}

export default ModalHeader;
