import React from 'react';

import { Container, Row } from '../Grid';
import LoginForm from './LoginForm';

class Login extends React.Component {
	render() {
		console.log(this.props);

		return (
			<div className="login">
				<div className="login-box">
					<div className="padding-bottom-3 ta-center">
						<h5 className="fw-semibold">805 Carwash Admin Panel</h5>
						<p>Silahkan masukkan data dengan lengkap dan benar.</p>
					</div>
					<LoginForm {...this.props} />
				</div>
			</div>
			// <main className="main">
			// 	<Container className="padding-top-3 padding-bottom-3">
			// 		<Row className="flex justify-content--center">
			// 			<div className="column-12 column-md-5">
			// 				<PageBlock theme="primary">
			// 					<PageHeading className="ta-center">
			// 						<h5><span className="fw-semibold">Carwash 805</span> Admin Panel</h5>
			// 					</PageHeading>
			// 					<PageContent>
			// 						<LoginForm />
			// 					</PageContent>
			// 				</PageBlock>
			// 			</div>
			// 		</Row>
			// 	</Container>
			// </main>
		);
	}
}

export default Login;
