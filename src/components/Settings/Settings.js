import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';

import MainSidenav from '../MainSidenav';

class Settings extends Component {
	constructor() {
		super();
		this.renderSubroutes = this.renderSubroutes.bind(this);
	}

	renderSubroutes = (route, i) => {
		const { match } = this.props;
		const path = route.name.replace(/\s+/g, '-').toLowerCase();

		return (
			<PropsRoute
				key={i}
				name={route.name}
				path={`${match.url}/${path}`}
				component={route.component}
				{...this.props}
			/>
		)
	}

	render() {
		const {
			match,
			subroutes
		} = this.props;

		const firstRoutePath = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								<MainSidenav items={ subroutes } basePath={match.path} />
							</aside>
						</div>
						<div className="column-10">
							{ subroutes.map(this.renderSubroutes) }
							<Redirect from={`${match.url}`} to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
			</main>
		);
	}

}

export default Settings;
