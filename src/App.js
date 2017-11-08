import React from 'react';
import PropTypes from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

import MainView from './components/MainView';

class App extends React.Component {
	constructor() {
		super();
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.state = {
			user: null,
			member: null,
			accessToken: '',
			isAuthenticated: false
		}
	}

	componentWillMount = () => {
		this.handleAccessToken();
	}

	handleAccessToken = () => {
		const { cookies } = this.props;
		const token = cookies.get('accessToken') || null;
		const user = Object.assign({}, cookies.get('user') || null);
		const member = Object.assign({}, cookies.get('member') || null);

		this.setState({
			user: user,
			member: member,
			accessToken: token,
			isAuthenticated: token ? true : false
		})
	}

	render() {
		return (
			<MainView {...this.state} {...this.props} />
		);
	}
}

App.PropTypes = {
	cookies: PropTypes.instanceOf(Cookies).isRequired
}

export default withCookies(App);
