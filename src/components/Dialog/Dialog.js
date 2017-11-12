import React from 'react';
import classNames from 'classnames';
import { Modal } from 'reactstrap';
import { ModalHeader } from '../Modal';

class Dialog extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {
			title,
			children,
			className
		} = this.props;

		const classes = classNames(
			className
		);

		return (
			<Modal className={classes} {...this.props}>
				<ModalHeader align="center">{title}</ModalHeader>
				{children}
			</Modal>
		)
	}
}

export default Dialog;