import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import LandingContainer from '../containers/LandingContainer';
import ServicesContainer from '../containers/ServicesContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="landing" exact path='/' component={ LandingContainer } />
				<Route name="services" path='/services' component={ ServicesContainer } />
				{/* <Route name="home" path='/' component={ HomeContainer } /> */}
			</Switch>
		)
	}
}

export default MainView;
