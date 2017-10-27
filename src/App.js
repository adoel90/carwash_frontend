import React from 'react';
import PropTypes from 'prop-types';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies, CookiesProvider } from 'react-cookie';

import MainHeader from './components/MainHeader';
import MainSubheader from './components/MainSubheader';
import MainView from './components/MainView';

class App extends React.Component {
	constructor() {
		super();
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.state = {
			accessToken: '',
			isAuth: false,
			userData: {}
		}
	}

	componentDidMount = () => {
		this.handleAccessToken();
	}

	handleAccessToken = () => {
		const { cookies } = this.props;
		const token = cookies.get('accessToken') || null;

		this.setState({
			accessToken: token,
			isAuth: token ? true : false
		})
	}

	render() {
		return (
			<div>
				<MainHeader />
				<MainSubheader />
				<MainView {...this.state} {...this.props} />
			</div>
		);
	}
}

App.PropTypes = {
	cookies: PropTypes.instanceOf(Cookies).isRequired
}

export default withCookies(App);
