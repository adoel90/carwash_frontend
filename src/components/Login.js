import React from 'react';
import { Container, Row } from '../components/Grid';
import { PageBlock, PageHeading, PageContent } from '../components/Page';
import { Form, FormGroup } from '../components/Form';
import { Input, Label } from '../components/Input';
import Button from '../components/Button';

class Login extends React.Component {
	render() {
		return (
			<main className="main">
				<Container className="padding-top-3">
					<Row>
						<div className="column-5">
							<PageBlock>
								<PageHeading>
									<h5>Welcome to Carwash 805 Admin Panel</h5>		
								</PageHeading>
								<PageContent>
									<Form>
										<FormGroup>
											<Label>
												<small className="tt-uppercase fw-semibold ls-base clr-primary">Username</small>
											</Label>
											<Input type="text" placeholder="Masukkan username" />
										</FormGroup>
										<FormGroup>
											<Label>
												<small className="tt-uppercase fw-semibold ls-base clr-primary">Password</small>
											</Label>
											<Input type="password" placeholder="Masukkan kata sandi" />
										</FormGroup>
										<Button buttonStyle="primary" buttonFull>
											<small className="fw-semibold ls-base tt-uppercase">Masuk</small>
										</Button>
									</Form>
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
