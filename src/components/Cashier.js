import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContent from '../components/MainContent';

import RegisterContainer from '../containers/RegisterContainer';
import TopupContainer from '../containers/TopupContainer';
import ChangeCardContainer from '../containers/ChangeCardContainer';

class Cashier extends React.Component {
	render() {
		const {
			match
		} = this.props;

		return(
			<div className="main-container">
				<MainSidebar>
					<MainSidenav items={this.props.sidenavItems} basePath={match.path} />
				</MainSidebar>
				<MainContent>
					<Route name='cashier' path={`${match.url}/register`} component={RegisterContainer} />
					<Route name='cashier' path={`${match.url}/topup`} component={TopupContainer} />
					<Route name='cashier' path={`${match.url}/change-card`} component={ChangeCardContainer} />
					<Redirect from={`${match.url}`} to={`${match.url}/register`} />
				</MainContent>
			</div>
		)
	}
}

export default Cashier;
