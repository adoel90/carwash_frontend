import React from 'react';
import { Redirect } from 'react-router-dom';

import { PageBlock } from '../components/Page';
import Currency from '../components/Currency';
import { PropsRoute } from '../components/Route';
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
				{...this.props}
			/>
		)
	};

	render() {
		const {
			match,
			member,
			service
		} = this.props;

		const firstRoutePath = service.types[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>
						<aside className="sidebar column-2">
							<MainSidenav items={ service.types } basePath={match.path} />
						</aside>
						<div className="column-10">
							<div className="heading padding-bottom-1">
								<PageBlock>
									<Row>
										<div className="column-9">
											<h5 className="fw-medium">Selamat datang, <span className="fw-semibold">{member.name}.</span></h5>
											<p className="clr-passive">Silahkan pilih layanan yang diinginkan.</p>
										</div>
										<div className="column-3 ta-center">
											<h6 className="tt-uppercase ls-base clr-passive fw-semibold">Saldo Anda</h6>
											<h5 className="fw-bold">
												<Currency value={member.balance} />
											</h5>
										</div>
									</Row>
								</PageBlock>

							</div>
							{ service.types.map(this.renderServiceType) }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
			</main>
		)
	}
}

export default Service;
