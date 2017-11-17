import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalContent, ModalFooter, ModalDialogIcon } from '../Modal';
import { Button } from '../Button';

class ModalDialog extends Component {
	constructor() {
		super();
		this.renderDialogButtons = this.renderDialogButtons.bind(this);
	}

	renderDialogButtons = () => {
		const {
			onCancel,
			onConfirm,
			onClose,
			confirmText,
			cancelText,
			closeText,
		} = this.props;

		let buttonStack = [];

		if(onCancel) {
			buttonStack.push(
				<Button buttonTheme="danger" buttonSize="small" className="clr-light margin-right-1" onClick={onCancel}>
					<small className="fw-semibold tt-uppercase ls-base">{cancelText}</small>
				</Button>
			)
		}

		if(onConfirm) {
			buttonStack.push(
				<Button buttonTheme="primary" buttonSize="small" className="clr-light" onClick={onConfirm}>
					<small className="fw-semibold tt-uppercase ls-base">{confirmText}</small>
				</Button>
			)
		}

		if(onClose) {
			buttonStack.push(
				<Button buttonTheme="secondary" buttonSize="small" className="clr-dark" onClick={onClose}>
					<small className="fw-semibold tt-uppercase ls-base">{closeText}</small>
				</Button>
			)
		}

		return buttonStack;
	}

	render() {
		const {
			children,
			type,
			title,
			message
		} = this.props;

		console.log(this.props);

		return (
			<Modal {...this.props}>
				<ModalContent className="flex flex-column align-items--center justify-content--center ta-center">
					<ModalDialogIcon type={type} />
					<h5 className="fw-semibold">{title}</h5>
					<p>{message}</p>
				</ModalContent>
				<ModalFooter className="flex justify-content--center">
					{ this.renderDialogButtons() }
				</ModalFooter>
			</Modal>
		);
	}

}

export default ModalDialog;
