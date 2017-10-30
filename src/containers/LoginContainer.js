import React from 'react';
import { Login } from '../components/Login';

class LoginContainer extends React.Component {
	render() {
		console.log(this.props);

		return (
			<Login
				{...this.state}
				{...this.props}
			/>
		)
	}
}

export default LoginContainer;
