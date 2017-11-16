import React from 'react';

import { Redirect } from 'react-router-dom';
import { Container, Row } from '../Grid';
import { PropsRoute } from '../Route';

import MainSidenav from '../MainSidenav';

import CafeTypeContainer from '../../containers/CafeTypeContainer';

class Cafe extends React.Component {
	constructor() {
		super();
		this.renderCafeType = this.renderCafeType.bind(this);
	}

	renderCafeType = (type, i) => {
		const { match } = this.props;
		const path = type.name.replace(/\s+/g, '-').toLowerCase();
		console.log(type);

		return (
			<PropsRoute
				key={i}
				name={type.name}
				path={`${match.url}/${path}`}
				component={CafeTypeContainer}
				type={type}
				{...this.props}
			/>
		)
	}

	render() {
		const {
			match,
			cafe
		} = this.props;

		let firstRoutePath = cafe.types[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								<MainSidenav items={ this.props.cafe.types } basePath={match.path} />
							</aside>
						</div>
						<div className="column-10">
							{ cafe.types.map(this.renderCafeType) }
							<Redirect from="/*"	 to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
			</main>
		)
	}
}

export default Cafe;
