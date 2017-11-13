import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalContent } from '../Modal';

class ModalDialog extends Component {
	render() {
		const {
			children
		} = this.props;

		return (
			<Modal {...this.props}>
				<ModalContent>
					{children}
				</ModalContent>
			</Modal>
		);
	}

}

export default ModalDialog;
