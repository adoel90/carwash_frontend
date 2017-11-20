import React from 'react';
import PropTypes from 'prop-types';
import {
	withCookies,
	Cookies
} from 'react-cookie';

import MainRoutes from './components/MainRoutes';

class App extends React.Component {
	constructor() {
		super();
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.state = {
			user: null,
			member: null,
			accessToken: '',
			isAuthenticated: false,
		}
	}

	componentWillMount = () => {
		this.handleAccessToken();
	}

	handleAccessToken = () => {
		const {
			cookies
		} = this.props;

		const accessToken = cookies.get('accessToken') || null;
		const userData = Object.assign({}, cookies.get('user') || null);
		const memberData = Object.assign({}, cookies.get('member') || null);

		this.setState({
			user: userData,
			member: memberData,
			accessToken: accessToken,
			isAuthenticated: accessToken ? true : false
		});
	}

	render() {
		return <MainRoutes {...this.state} {...this.props} />
	}
}

App.PropTypes = {
	cookies: PropTypes.instanceOf(Cookies).isRequired
}

export default withCookies(App);
