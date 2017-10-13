import React from 'react';
import { Route } from 'react-router-dom';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContent from '../components/MainContent';

import CarwashContainer from '../containers/CarwashContainer';


class SelfService extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {
			match
		} = this.props;

		return (
			<main id="self-service" className="main">
				<div className="main-container">
					<MainSidebar>
						<MainSidenav items={this.props.sidenavItems} />
					</MainSidebar>
					<MainContent>
						<Route name='car-wash' path={`${match.url}/car-wash`} component={CarwashContainer} />
					</MainContent>
				</div>
			</main>
		)
	}
}

export default SelfService;
