import React from 'react';
import { Login } from '../components/Login';

import { connect } from 'react-redux';
import { userLogin } from '../actions/user.action.js';

class LoginContainer extends React.Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

		this.state = {
			loginData: {
				username: '',
				password: ''
			}
		}
	}

	componentDidUpdate = (prevProps) => {
		const {
			user
		} = this.props;

		if(prevProps.user.item !== user.item) {
			if(user.item.isError) {
				this.setState({
					error: user.item.error.response.data
				})
			}
		}
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		if(object) {
			object[name] = value;
			this.forceUpdate();
		}
		else {
			this.setState({
				[name]: value
			})
		}
	}

	handleLoginSubmit = (e) => {
		const {
			loginData
		} = this.state;

		const {
			dispatch,
			cookies
		} = this.props;

		e.preventDefault();

		const requiredData = {
			username: loginData.username,
			password: loginData.password
		}

		if(loginData.username && loginData.password) {
			dispatch(userLogin(requiredData));
		}
	}

	render() {
		return (
			<Login
				{...this.state}
				{...this.props}
				handleInputChange={this.handleInputChange}
				handleLoginSubmit={this.handleLoginSubmit}
			/>
		)
	}
}

const mapDispatchToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapDispatchToProps)(LoginContainer);
