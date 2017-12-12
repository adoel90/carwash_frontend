import React from 'react';

import { Container, Row } from '../Grid';
import LoginForm from './LoginForm';

class Login extends React.Component {
	render() {
		return (
			<div className="login">
				<div className="login-box">
					<div className="padding-bottom-3 ta-center">
						<h5 className="fw-semibold">805 Carwash Admin Panel</h5>
						<p>Silahkan masukkan username dan kata sandi dengan benar.</p>
					</div>
					<LoginForm {...this.props} />
				</div>
				<span className="login-bg"></span>
			</div>
		);
	}
}

export default Login;
