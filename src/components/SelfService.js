import React from 'react';
import { Route, Redirect, IndexRedirect } from 'react-router-dom';
import PropsRoute from '../components/PropsRoute';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContainer from '../components/MainContainer';
import MainContent from '../components/MainContent';

import SelfServiceCategory from '../components/SelfServiceCategory';
// import CarwashContainer from '../containers/CarwashContainer';

class SelfService extends React.Component {
	constructor() {
		super();
		this.renderRoute = this.renderRoute.bind(this);
	}

	renderRoute = (route, i) => {
		const { match } = this.props;

		return (
			<PropsRoute
				name={route.name}
				path={`${match.url} + route.name`}
				component={ () => <SelfServiceCategory {...route} /> }
			/>
		)
	};

	render() {
		const { match } = this.props;

		return (
			<main id="self-service" className="main">
				<MainContainer>
					<MainSidebar>
						<MainSidenav items={ this.props.categories } basePath={match.path} />
					</MainSidebar>
					<MainContent>
						{ this.props.categories.map(this.renderRoute) }
						{/* <Redirect from="/*" to={`${match.url}/car-wash`} /> */}
						{/* <Route name='car-wash' path={`${match.url}/car-wash`} component={CarwashContainer} /> */}
					</MainContent>
				</MainContainer>
			</main>
		)
	}
}

export default SelfService;
