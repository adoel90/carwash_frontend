import React from 'react';
import PropTypes from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

import MainHeader from './components/MainHeader';
import MainSubheader from './components/MainSubheader';
import MainView from './components/MainView';

class App extends React.Component {
	constructor() {
		super();
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.state = {
			accessToken: '',
			isLoggedIn: false,
			user: {}
		}
	}

	componentWillMount = () => {
		this.handleAccessToken();
	}

	handleAccessToken = () => {
		const { cookies } = this.props;
		const token = cookies.get('accessToken') || null;
		const user = cookies.get('user') || null

		this.setState({
			accessToken: token,
			user: user,
			isLoggedIn: token ? true : false
		})
	}

	render() {
		console.log(this.state);

		return (
			<div>
				<MainHeader />
				<MainSubheader {...this.state} {...this.props} />
				<MainView {...this.state} {...this.props} />
			</div>
		);
	}
}

App.PropTypes = {
	cookies: PropTypes.instanceOf(Cookies).isRequired
}

export default withCookies(App);
