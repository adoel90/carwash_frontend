import React from 'react';
import { Redirect } from 'react-router-dom';
import PropsRoute from '../components/PropsRoute';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContainer from '../components/MainContainer';
import MainContent from '../components/MainContent';

import ServiceTypeContainer from '../containers/ServiceTypeContainer';

class Service extends React.Component {
	constructor() {
		super();
		this.renderCategoryType = this.renderCategoryType.bind(this);
	}

	renderCategoryType = (type, i) => {
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
			service
		} = this.props;

		const firstRoutePath = service.types.data[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<MainContainer>
				<MainSidebar>
					<MainSidenav items={ service.types.data } basePath={match.path} />
				</MainSidebar>
				<MainContent>
					{ service.types.data.map(this.renderCategoryType) }
					<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
				</MainContent>
			</MainContainer>
		)
	}
}

export default Service;
