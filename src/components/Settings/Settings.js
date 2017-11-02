import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';

import MainSidenav from '../MainSidenav';

class Settings extends Component {
	render() {
		const {
			match
		} = this.props;

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
							</aside>
						</div>
						<div className="column-10">
						</div>
					</Row>
				</Container>
			</main>
		);
	}

}

export default Settings;
