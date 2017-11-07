import React from 'react';
import { Container, Row } from '../components/Grid';
import { PageBlock } from '../components/Page';

class Landing extends React.Component {
	render() {
		return (
			<main className="main">
				<Container className="padding-top-2 padding-bottom-2">
					<Row>
						<div className="column-6">
							<PageBlock>
								
							</PageBlock>
						</div>
						<div className="column-6">

						</div>
					</Row>
				</Container>
			</main>
		)
	}
}

export default Landing;
