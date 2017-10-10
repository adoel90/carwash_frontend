import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';

class MainView extends React.Component {
	render() {
		return (
			<Switch>
				<Route name="home" exact path='/' component={ HomeContainer } />
			</Switch>
		)
	}
}

export default MainView;
