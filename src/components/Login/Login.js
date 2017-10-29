import React from 'react';

import { Container, Row } from '../Grid';
import { PageBlock, PageHeading, PageContent } from '../Page';
import LoginForm from './LoginForm';

class Login extends React.Component {
	render() {
		return (
			<main className="main login">
				<Container className="login__container padding-top-3">
					<Row>
						<div className="column-12 column-md-6">
							<PageBlock primary>
								<PageHeading className="ta-center">
									<h5><span className="fw-semibold">Carwash 805</span> Admin Panel</h5>		
								</PageHeading>
								<PageContent>
									<LoginForm />
								</PageContent>
							</PageBlock>
						</div>
					</Row>
				</Container>
			</main>
		);
	}
}

export default Login;
