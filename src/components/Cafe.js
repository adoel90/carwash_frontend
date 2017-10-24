import React from 'react';

import { Redirect } from 'react-router-dom';
import PropsRoute from '../components/PropsRoute';

import MainContainer from '../components/MainContainer';
import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContent from '../components/MainContent';

import CafeTypeContainer from '../containers/CafeTypeContainer';

class Cafe extends React.Component {
	constructor() {
		super();
		this.renderCafeType = this.renderCafeType.bind(this);
	}

	renderCafeType = (type, i) => {
		const { match } = this.props;
		const path = type.name.replace(/\s+/g, '-').toLowerCase();

		return (
			<PropsRoute
				key={i}
				name={type.name}
				path={`${match.url}/${path}`}
				component={CafeTypeContainer}
				type={type}
			/>
		)
	}

	render() {
		const {
			match,
			cafe,
			cafeTypes
		} = this.props;

		const firstRoutePath = cafeTypes[0].name.replace(/\s+/g, '-').toLowerCase();

		return (
			<MainContainer>
				<MainSidebar>
					<MainSidenav items={ this.props.cafe.types } basePath={match.path} />
				</MainSidebar>
				<MainContent>
					{ cafeTypes.map(this.renderCafeType) }
					<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
				</MainContent>
			</MainContainer>
		)
	}
}

export default Cafe;
