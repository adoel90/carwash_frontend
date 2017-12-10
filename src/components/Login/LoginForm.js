import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

class LoginForm extends React.Component {
	render() {
		const {
			user,
			loginData,
			handleInputChange,
			handleLoginSubmit
		} = this.props;

		const renderAlert = () => {
			const {
				user
			} = this.props;

			if(user.item.isError) {
				let errorMessage = user.item.error.response.data.message;

				return (
					<Alert theme="warning" className="ta-center margin-bottom-2 clr-danger">
						<p>{errorMessage}</p>
					</Alert>
				)
			}
		}


		return (
			<Form onSubmit={handleLoginSubmit}>
				{ renderAlert() }
				<FormGroup>
					<Label htmlFor="username">
						<small className="tt-uppercase fw-semibold ls-base">Username</small>
					</Label>
					<Input
						name="username"
						type="text"
						placeholder="Masukkan username"
						onChange={(e) => handleInputChange(loginData, e)}
						required="true"
					/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">
						<small className="tt-uppercase fw-semibold ls-base">Password</small>
					</Label>
					<Input
						name="password"
						type="password"
						placeholder="Masukkan kata sandi"
						onChange={(e) => handleInputChange(loginData, e)}
						required="true"
					/>
				</FormGroup>
				<Button type="submit" buttonTheme="secondary" buttonFull disabled={user.item.isAuthenticating || !loginData.username || !loginData.password}>
					<small className="fw-semibold ls-base tt-uppercase clr-dark">{user.item.isAuthenticating ? 'Tunggu sebentar...' : 'Masuk'}</small>
				</Button>
			</Form>
		)
	}
}

export default LoginForm;
