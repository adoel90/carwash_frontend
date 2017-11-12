import React from 'react';
import Dialog from './Dialog';
import { ModalContent, ModalFooter } from '../Modal';
import { Form } from '../Form';
import { Button } from '../Button';

class DialogConfirm extends React.Component {
	render() {
		const {
			children,
			onCancel,
			onConfirm
		} = this.props

		return (
			<Dialog {...this.props}>
				<Form onSubmit={this.props.onConfirm}>
					<ModalContent>
						<i className="fi flaticon-warning icon icon--gigant"></i>
						{children}
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger">
							{this.props.cancelText}
						</Button>
						<Button type="submit" buttonTheme="primary">
							{this.props.confirmText}
						</Button>
					</ModalFooter>
				</Form>
			</Dialog>
		)
	}
}

export default DialogConfirm;