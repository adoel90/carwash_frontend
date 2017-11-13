import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';

class Dialog extends Component {
	render() {
		return (
			<Modal {...this.props}>
				<ModalHeader align="center">
				</ModalHeader>
			</Modal>
		);
	}

}

export default Dialog;
