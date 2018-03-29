import React, { Component } from 'react';
import { CashierRefundConfirmation } from '../Cashier';

import { PageBlock, PageBlockGroup } from '../Page';
import { Form, FormGroup } from '../Form';
import { FormField }  from '../../layouts/Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

class CashierRefund extends Component {
	render() {
		const {
			member,
			refund,
			// handleInputChange,
			handleAuthenticateMember,

			authData,
			handleInputChange,
			handleAuthentication,
			isModalOpen,
			error
		} = this.props;
		
		const renderAlert = () => {
			if(member.isError || member.item.isError) {
				return (
					<Alert theme="danger" className="flex align-items--center clr-light margin-bottom-2">
						<i className="ion-alert-circled margin-right-2 icon icon--base"></i>
						<p className="fw-semibold">{member.item.error.response.data.message}</p>
					</Alert>
				)
			}
		}
		
		return (
			<div className="inner-view">
				<PageBlockGroup>
					<Form onSubmit={handleAuthentication}>
						<FormField>
							<InputGroup>
								<InputAddon>
									<i className="fas fa-id-card"></i>
								</InputAddon>
								<Input
									className="input"
									type="number"
									name="cardID"
									placeholder="16-digit nomor kartu member"
									required="true"
									autoFocus
									selectOnFocus
									// onChange={(e) => handleInputChange('refund', e)}
									onChange={(e) => handleInputChange(authData, e)}
								/>
							</InputGroup>
						</FormField>

						<div className="flex justify-content--flex-end">
							<Button buttonTheme="primary">
								<small className="fw-semibold tt-uppercase ls-base clr-light">Cari</small>
							</Button>
						</div>
					</Form>
				</PageBlockGroup>
				
				{/* <CashierRefundConfirmation {...this.props} /> */}
			</div>
		);
	}
}

export default CashierRefund;