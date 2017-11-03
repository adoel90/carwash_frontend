import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Row } from '../Grid';
import MainSidenav from '../MainSidenav';
import { PropsRoute } from '../Route';

class Cashier extends React.Component {
	constructor() {
		super();
		this.renderSubRoutes = this.renderSubRoutes.bind(this);
	}

	renderSubRoutes = (route) => {
		const { match } = this.props;
		const path = route.name.replace(/\s+/g, '-').toLowerCase();

		return <PropsRoute path={`${match.url}/${path}`} component={route.component} {...this.props}/>
	}

	render() {
		const { subRoutes, match } = this.props;
		const firstRoutePath = subRoutes[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								<MainSidenav items={this.props.subRoutes} basePath={match.path} />
							</aside>
						</div>
						<div className="column-10">
							{subRoutes.map(this.renderSubRoutes)}
							{/* <Redirect from={match.url} to={`${match.url}/${firstRoutePath}`} /> */}
							<Redirect from={match.url} to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
			</main>
		);
	}

}

export default Cashier;
