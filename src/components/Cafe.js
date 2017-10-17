import React from 'react';

import { Route } from 'react-router-dom';

import MainContainer from '../components/MainContainer';
import MainSidebar from '../components/MainSidebar';
import MainContent from '../components/MainContent';
import MainSidenav from '../components/MainSidenav';

import CafeLunch from '../components/CafeLunch';

class Cafe extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {
			match
		} = this.props;

		return (
			<main id="cafe" className="main">
				<MainContainer>
					<MainSidebar>
						<MainSidenav items={ this.props.sidenavItems } />
					</MainSidebar>
					<MainContent>
						<Route name='lunch' path={`${match.url}/lunch`} component={CafeLunch} />
					</MainContent>
				</MainContainer>
			</main>
		)
	}
}

export default Cafe;
