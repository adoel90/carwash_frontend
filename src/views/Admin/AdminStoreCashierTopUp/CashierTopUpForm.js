import React, { Component } from 'react';

import { Form, FormGroup } from '../../../components/Form';
import { FormField } from '../../../layouts/Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label, Select } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { Container, Row, Column } from '../../../layouts/Grid';

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
			error,
			kasirList, 
            userState,
			handleClickChange

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

				{/* Dropdownlist to see list of kasir */}
				{/* <Row>
					<Column className="flex">
						<div className="margin-right-small">
								<FormField> 
									<Select 
										required
										name="store" 
										onChange={(e) => handleClickChange(e) }
										style={{zIndex: 1}}
									>
										<option>Pilih Kasir</option>
										{
												kasirList.length  ? kasirList.map((data) => {
												return <option value={data.id}>{data.name}</option>
											})
											: null
										}
									</Select>
								</FormField>
						</div>
					</Column>
				</Row> */}

				
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
