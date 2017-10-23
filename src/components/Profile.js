import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContainer from '../components/MainContainer';
import MainContent from '../components/MainContent';

import ProfileAccount from '../components/ProfileAccount';

class Profile extends React.Component {
	render() {
		const {
			match
		} = this.props;

		return (
			<MainContainer>
				<MainSidebar>
					<MainSidenav items={this.props.sidenavItems} />
				</MainSidebar>
				<MainContent>
					<Route name='account' path={`${match.url}/account`} component={ProfileAccount} />
					<Redirect from={`${match.url}`} to={`${match.url}/account`} />
				</MainContent>
			</MainContainer>
		);
	}
}

export default Profile;
