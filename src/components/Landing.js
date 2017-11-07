import React from 'react';
import { Container, Row } from '../components/Grid';
import { PageBlock } from '../components/Page';
import { default as CardIcon } from '../assets/icons/Business/credit-card-3.svg';
import { default as Store } from '../assets/icons/Business/store-3.svg';

class Landing extends React.Component {
	render() {
		return (
			<main className="main landing-main">
				<Container className="padding-top-2 padding-bottom-2" style={{ height: '100%' }}>
					<Row>
						<div className="column-6">
							<PageBlock primary className="flex align-items--center justify-content--center ta-center">
								<img src={Store} className="column-8" />
								<h4 className="fw-bold tt-uppercase ls-base">Carwash 805</h4>
								<h5 className="fw-semibold">Member Area</h5>
							</PageBlock>
						</div>
						<div className="column-6 flex flex-column align-items--center justify-content--center ta-center">
							<h5 className="fw-medium">Silahkan gesek kartu Anda pada mesin yang telah disediakan.</h5>
						</div>
					</Row>
				</Container>
			</main>
		)
	}
}

export default Landing;
