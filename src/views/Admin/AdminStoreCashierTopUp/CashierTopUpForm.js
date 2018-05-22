import React, { Component } from 'react';

import { Form, FormGroup } from '../../../components/Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';

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
					<Alert theme="danger" className="flex justify-content--center clr-light margin-bottom-small">
						<i className="ion-alert-circled margin-right-small"></i>
						<p>{error.data.message}</p>
					</Alert>
				)
			}
		}

		return (
 			<Form onSubmit={handleAuthentication}>

				{ renderAlert() }
			
				<FormGroup>
					<InputGroup>
						<InputAddon>
							<i className="fas fa-id-card" />
						</InputAddon>
						<Input
							name="cardID"
							type="password"
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
