import React from 'react';
import { Redirect } from 'react-router-dom';

import PropsRoute from '../components/PropsRoute';
import { Container, Row } from '../components/Grid';
import MainSidenav from '../components/MainSidenav';

import ServiceTypeContainer from '../containers/ServiceTypeContainer';

class Service extends React.Component {
	constructor() {
		super();
		this.renderServiceType = this.renderServiceType.bind(this);
	}

	renderServiceType = (type, i) => {
		const { match } = this.props;
		const path = type.name.replace(/\s+/g, '-').toLowerCase();

		return (
			<PropsRoute
				key={i}
				name={type.name}
				path={`${match.url}/${path}`}
				component={ServiceTypeContainer}
				type={type}
			/>
		)
	};

	render() {
		const {
			match,
			serviceTypes
		} = this.props;

		const firstRoutePath = serviceTypes[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								<MainSidenav items={ serviceTypes } basePath={match.path} />
							</aside>
						</div>
						<div className="column-10">
							{ serviceTypes.map(this.renderServiceType) }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
			</main>
		)
	}
}

export default Service;
