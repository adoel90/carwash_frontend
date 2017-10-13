import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SelfServiceContainer from '../containers/SelfServiceContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="dashboard" path='/self-service' component={ SelfServiceContainer } />
				<Route name="self-service" path='/self-service' component={ SelfServiceContainer } />
				<Redirect from="/" to="self-service" />
			</Switch>
		)
	}
}

export default MainView;
