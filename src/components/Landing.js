import React from 'react';
import { Container, Row } from '../components/Grid';
import { PageBlock } from '../components/Page';
import { default as CardIcon } from '../assets/icons/Business/credit-card-3.svg';
import { default as StoreIcon } from '../assets/icons/Business/store-2.svg';
import { Form, FormGroup } from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

class Landing extends React.Component {
	render() {
		const {
			member,
			match,
			isAuthenticated,
			handleInputChange,
			handleAuthentication
		} = this.props;
		
		if(!isAuthenticated) {
			return (
				<Form onSubmit={handleAuthentication}>
					<main className="main landing">
						<div className="landing__container">
							<img src={StoreIcon} style={{ width: '150px' }} />
							<h3 className="fw-bold">Selamat datang di Carwash 805</h3>
							<h5 className="padding-bottom-3 fw-semibold">Silahkan gesek kartu member Anda.</h5>
							<FormGroup>
								<Input
									type="number"
									name="cardID"
									onChange={(e) => handleInputChange('authData', e)}
									autoFocus
									selectOnFocus
								/>
							</FormGroup>
						</div>
					</main>
				</Form>
			)
		}

		return null;
	}
}

export default Landing;
