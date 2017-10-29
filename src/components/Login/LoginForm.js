import React from 'react';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, Label } from '../Input';
import Button from '../Button';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name =target.name;

		this.setState({
			[name]: value
		})

		console.log(this.state);
	}

	render() {
		const {
			username,
			password
		} = this.state;

		return (
			<Form>
				<FormGroup>
					<Label>
						<small className="tt-uppercase fw-semibold ls-base">Username</small>
					</Label>
					<Input
						name="username"
						type="text"
						placeholder="Masukkan username"
						value={username}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label>
						<small className="tt-uppercase fw-semibold ls-base">Password</small>
					</Label>
					<Input
						name="password"
						type="password"
						placeholder="Masukkan kata sandi"
						value={password}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<Button type="submit" buttonStyle="dark" buttonFull>
					<small className="fw-semibold ls-base tt-uppercase">Masuk</small>
				</Button>
			</Form>
		)
	}
}

export default LoginForm;
