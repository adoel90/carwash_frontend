import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContainer from '../components/MainContainer';
import MainContent from '../components/MainContent';

import CarwashContainer from '../containers/CarwashContainer';


class SelfService extends React.Component {
	render() {
		const {
			match
		} = this.props;

		return (
			<main id="self-service" className="main">
				<MainContainer>
					<MainSidebar>
						<MainSidenav items={this.props.sidenavItems} />
					</MainSidebar>
					<MainContent>
						<Redirect from={`${match.url}`} to={`${match.url}/car-wash`} />
						<Route name='car-wash' path={`${match.url}/car-wash`} component={CarwashContainer} />
					</MainContent>
				</MainContainer>
			</main>
		)
	}
}

export default SelfService;
