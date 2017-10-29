import React from 'react';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, Label } from '../Input';
import Button from '../Button';

class LoginForm extends React.Component {
	render() {
		return (
			<Form>
				<FormGroup>
					<Label>
						<small className="tt-uppercase fw-semibold ls-base">Username</small>
					</Label>
					<Input type="text" placeholder="Masukkan username" />
				</FormGroup>
				<FormGroup>
					<Label>
						<small className="tt-uppercase fw-semibold ls-base">Password</small>
					</Label>
					<Input type="password" placeholder="Masukkan kata sandi" />
				</FormGroup>
				<Button type="submit" buttonStyle="dark" buttonFull>
					<small className="fw-semibold ls-base tt-uppercase">Masuk</small>
				</Button>
			</Form>
		)
	}
}

export default LoginForm;