import React, { Component } from 'react';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';

class CashierTopUpForm extends Component {
	render() {
		const {
			member,
			memberAuthData,
			handleInputChange,
			handleMemberAuthenticateSubmit
		} = this.props;

		return (
			<Form onSubmit={handleMemberAuthenticateSubmit}>
				<FormGroup>
					<InputGroup>
						<Input
							name="card"
							type="number"
							className="form-control--large ta-center"
							placeholder="Klik kolom ini dahulu sebelum menggesek"
							onChange={(e) => handleInputChange(memberAuthData, e)}
							autoFocus="true"
							selectOnFocus
						/>
					</InputGroup>
					{ member.isError ? <small className="clr-danger">{member.error.message}</small> : null}
				</FormGroup>
			</Form>
		);
	}
}

export default CashierTopUpForm;

// renderSuccessDialog = () => {
// 	const {
// 		member
// 	} = this.props;
//
// 	return (
// 		<Modal isOpen={this.state.isDialogOpen} toggle={this.toggleDialog}>
// 			<ModalContent className="flex flex-column align-items--center justify-content--center">
// 				<i className="fi flaticon-success icon icon--gigant clr-success"></i>
// 				<div className="ta-center">
// 					<h4 className="fw-semibold clr-success">Berhasil!</h4>
// 					<p>
// 						Proses isi ulang saldo untuk customer <span className="fw-semibold">{member.data.name} berhasil!</span> <br />
// 						Saldo customer kini berjumlah <span className="fw-semibold clr-primary"><Currency value={member.data.balance} /></span>
// 					</p>
// 				</div>
// 			</ModalContent>
// 		</Modal>
// 	)
// }
