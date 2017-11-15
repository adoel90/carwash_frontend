import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalContent, ModalFooter, ModalDialogIcon } from '../Modal';
import { Button } from '../Button';

class ModalDialog extends Component {
	render() {
		const {
			children,
			type,
			title,
			message,
			confirmText,
			cancelText,
			onCancel,
			onConfirm
		} = this.props;

		return (
			<Modal {...this.props}>
				<ModalContent className="flex flex-column align-items--center justify-content--center ta-center">
					<ModalDialogIcon type={type} />
					<h5 className="fw-semibold">{title}</h5>
					<p>{message}</p>
				</ModalContent>
				<ModalFooter className="flex justify-content--center">
					<Button buttonTheme="danger" buttonSize="small" className="clr-light margin-right-1" onClick={onCancel}>
						<small className="fw-semibold tt-uppercase ls-base">{cancelText}</small>
					</Button>
					<Button buttonTheme="primary" buttonSize="small" className="clr-light" onClick={onConfirm}>
						<small className="fw-semibold tt-uppercase ls-base">{confirmText}</small>
					</Button>
				</ModalFooter>
			</Modal>
		);
	}

}

export default ModalDialog;
