import React from 'react';

import { connect } from 'react-redux';
import { userLogin } from '../../actions/user.action.js';
import PropTypes from 'prop-types';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, Label } from '../Input';
import { Button } from '../Button';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			submitted: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		const { authentication, dispatch, cookies } = this.props;

		if(username && password) {
			dispatch(userLogin(username, password));
		}
	}

	render() {
		const {
			username,
			password,
			submitted
		} = this.state;

		const {
			authentication
		} = this.props;

		return (
			<Form>
				<FormGroup>
					<Label htmlFor="username">
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
					<Label htmlFor="password">
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
				<Button type="submit" buttonTheme="dark" buttonFull onClick={this.handleSubmit} disabled={authentication.isLoggingIn || !username || !password}>
					<small className="fw-semibold ls-base tt-uppercase">{authentication.isLoggingIn ? 'Tunggu sebentar...' : 'Masuk'}</small>
				</Button>
			</Form>
		)
	}
}


const mapDispatchToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

export default connect(mapDispatchToProps)(LoginForm);
