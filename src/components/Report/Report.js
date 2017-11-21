import React, { Component } from 'react';
import { Container, Row } from '../Grid';
import { AdminSidebar } from '../Admin';
import { PropsRoute } from '../Route';

class Report extends Component {
	constructor() {
		super();
		this.renderSubroutes = this.renderSubroutes.bind(this);
	}

	renderSubroutes = (route, i) => {
		const {
			match
		} = this.props;

		return (
			<PropsRoute
				key={i}
				to={`${match.url}/${route.path}`}
				component={route.component}
				{...this.props}
			/>
		)
	}

	render() {
		const {
			subroutes
		} = this.props;

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-5">
					<Row>
						<div className="column-3">
							<AdminSidebar navigations={subroutes} />
						</div>
						<div className="column-9">
							{ subroutes.map(this.renderSubroutes) }
						</div>
					</Row>
				</Container>
			</main>
		);
	}
}

export default Report;