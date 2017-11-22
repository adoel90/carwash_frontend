import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row } from '../Grid';
import { AdminSidebar } from '../Admin';
import { PropsRoute } from '../Route';

class Report extends Component {
	constructor() {
		super();
		this.renderSubroutes = this.renderSubroutes.bind(this);
		this.handleSubrouteRedirect = this.handleSubrouteRedirect.bind(this);
	}

	handleSubrouteRedirect = () => {
		const {
			match,
			subroutes
		} = this.props;
		
		let firstRoutePath = subroutes[0].name.replace(/\s+/g, '-').toLowerCase();
				
		return (
			<Redirect to={`${match.url}/${firstRoutePath}`} />
		)
	}

	renderSubroutes = (route, i) => {
		const {
			match
		} = this.props;

		return (
			<PropsRoute
				key={i}
				to={route.path}
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
				<div style={{ padding: '30px' }}>
					<Row>
						<div className="column-3">
							<AdminSidebar navigations={subroutes} />
						</div>
						<div className="column-9">
							{ subroutes.map(this.renderSubroutes) }
						</div>
					</Row>
				</div>
				{ this.handleSubrouteRedirect() }
			</main>
		);
	}
}

export default Report;