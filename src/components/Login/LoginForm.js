import React from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.renderErrorAlert = this.renderErrorAlert.bind(this);
	}

	renderErrorAlert = () => {
		const {
			user
		} = this.props;

		if(user.isError) {
			let errorMessage;

			if(user.error.response.data.status == 403) {
				errorMessage = 'User tidak ditemukan atau tidak aktif.'
			}

			return (
				<Alert theme="warning" className="margin-bottom-2">
					<p>{errorMessage}</p>
				</Alert>
			)
		}
	}

	render() {
		const {
			user,
			loginData,
			handleInputChange,
			handleLoginSubmit
		} = this.props;

		return (
			<Form onSubmit={handleLoginSubmit}>
				{ this.renderErrorAlert() }
				<FormGroup>
					<Label htmlFor="username">
						<small className="tt-uppercase fw-semibold ls-base">Username</small>
					</Label>
					<Input
						name="username"
						type="text"
						placeholder="Masukkan username"
						onChange={(e) => handleInputChange(loginData, e)}
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
					/>
				</FormGroup>
				<Button type="submit" buttonTheme="dark" buttonFull disabled={user.isLoggingIn || !loginData.username || !loginData.password}>
					<small className="fw-semibold ls-base tt-uppercase clr-light">{user.isLoggingIn ? 'Tunggu sebentar...' : 'Masuk'}</small>
				</Button>
			</Form>
		)
	}
}

export default LoginForm;
