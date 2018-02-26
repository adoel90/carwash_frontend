import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';

import MainRoutes from './components/MainRoutes';

class App2 extends React.Component {
	constructor() {
		super();
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.state = {
			accessToken: null,
			isAuthenticated: false,
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
			userData: userData,
			memberData: memberData
		});
	}

	render() {
		
		// return (
		// 	<MainRoutes
		// 		{...this.state} 
		// 		{...this.props}
		// 		handleLogout={this.handleLogout}
		// 	/>
		// )
	}
}

App2.PropTypes = {
	cookies: PropTypes.instanceOf(Cookies).isRequired
}

export default withCookies(App2);