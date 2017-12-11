import React from 'react';
import PropTypes from 'prop-types';
import PrintProvider from 'react-easy-print';
import {
	withCookies,
	Cookies
} from 'react-cookie';

import MainRoutes from './components/MainRoutes';

class App extends React.Component {
	constructor() {
		super();
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.state = {
			accessToken: '',
			isAuthenticated: {},
		}
	}

	componentWillMount = () => {
		this.handleAuthentication();
	}

	handleAuthentication = () => {
		const {
			cookies
		} = this.props;

		const accessToken = cookies.get('accessToken') || null;
		const userData = Object.assign({}, cookies.get('user') || null);
		const memberData = Object.assign({}, cookies.get('member') || null);

		this.setState({
			isAuthenticated: accessToken ? true : false,
			accessToken: accessToken,
			user: userData,
			member: memberData
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
