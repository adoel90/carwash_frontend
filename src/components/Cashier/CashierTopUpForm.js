import React, { Component } from 'react';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';

class CashierTopUpForm extends Component {

	render() {
		const {
			member,
			memberData,
			authentication,
			// error,
			// handleInputChange,
			handleMemberAuthenticateSubmit,

			authData,
			handleInputChange,
			handleAuthentication,
			isModalOpen,
			error

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

			// <Form onSubmit={handleMemberAuthenticateSubmit}>
 			// <Form onClick={handleAuthentication}>
 			<Form onSubmit={handleAuthentication}>

				{ renderAlert() }
			
				<FormGroup>
					<InputGroup>
						<InputAddon>
							<i className="ion-card" />
						</InputAddon>
						<Input
							name="cardID"
							type="number"
							placeholder="16-digit nomor kartu member"
							// onChange={(e) => handleInputChange(authentication, e)}
							onChange={(e) => handleInputChange(authData, e)}
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
