import React, { Component } from 'react';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

class CashierTopUpForm extends Component {
	render() {
		const {
			member,
			memberData,
			error,
			handleInputChange,
			handleMemberAuthenticateSubmit
		} = this.props;

		const renderAlert = () => {
			if(error.isError) {
				return (
					<Alert theme="danger" className="flex justify-content--center clr-light margin-bottom-2">
						<i className="ion-alert-circled margin-right-2"></i>
						<p>{error.data.message}</p>
					</Alert>
				)
			}
		}

		return (
			<Form onSubmit={handleMemberAuthenticateSubmit}>
				{ renderAlert() }
				<FormGroup>
					<InputGroup>
						<InputAddon>
							<i className="ion-card" />
						</InputAddon>
						<Input
							name="card"
							type="number"
							placeholder="16-digit nomor kartu member"
							onChange={(e) => handleInputChange(memberData, e)}
							autoFocus="true"
							selectOnFocus
						/>
					</InputGroup>
				</FormGroup>
			</Form>
		);
	}
}

export default CashierTopUpForm;
