import React from 'react';
import { Route } from 'react-router-dom';

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
			<main id="cashier" className="main">
				<div className="main-container">
					<MainSidebar>
						<MainSidenav items={this.props.sidenavItems} />
					</MainSidebar>
					<MainContent>
<<<<<<< HEAD
                        <Route name='register' path={`${match.url}/register`} component={RegisterContainer} />
                        <Route name='topup' path={`${match.url}/topup`} component={TopupContainer} />
                        <Route name='change-card' path={`${match.url}/change-card`} component={ChangeCardContainer} />
=======
						<Route name='cashier' path={`${match.url}/register`} component={RegisterContainer} />
						<Route name='cashier' path={`${match.url}/topup`} component={TopupContainer} />
						<Route name='cashier' path={`${match.url}/change-card`} component={ChangeCardContainer} />
>>>>>>> development
					</MainContent>
				</div>
			</main>
		)
	}
}

export default Cashier;
