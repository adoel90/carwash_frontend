import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import LoginContainer from '../containers/LoginContainer';
import ServiceContainer from '../containers/ServiceContainer';
import CafeContainer from '../containers/CafeContainer';
import CashierContainer from '../containers/CashierContainer';
import ProfileContainer from '../containers/ProfileContainer';

class MainView extends React.Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	constructor() {
		super();
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.state = {
			accessToken: ''
		}
	}

	componentDidMount = () => {
		this.handleAccessToken();
	}

	handleAccessToken = () => {
		const { cookies } = this.props;
		const { accessToken } = this.state;
		const token = cookies.get('accessToken');

		this.setState({
			accessToken: token ? token : null
		});
	}

	render() {
		const { accessToken } = this.state;

		return (
			<main className="main">
				<Switch>
					<Route name="login" path='/login' component={ LoginContainer } />
					<Route name="service" path='/service' component={ ServiceContainer } />
					<Route name="profile" path='/profile' component={ ProfileContainer } />
					<Route name="cashier" path='/cashier' component={ CashierContainer } />
					<Route name="cafe" path='/cafe' component={ CafeContainer } />
				</Switch>
			</main>
		)
	}
}

export default withCookies(MainView);
