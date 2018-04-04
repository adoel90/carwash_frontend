import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';

class ModalTransaction extends Component {
    render() {
        console.log(this.props);

        return(
            <Modal
				isOpen={false}>
					<ModalBody>

					</ModalBody>
			</Modal>
        )
    }
}

export default ModalTransaction;