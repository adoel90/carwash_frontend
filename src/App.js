import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies, CookiesProvider } from 'react-cookie';

import MainHeader from './components/MainHeader';
import MainSubheader from './components/MainSubheader';
import MainView from './components/MainView';

class App extends React.Component {
	render() {
		return (
			<CookiesProvider>
				<MainHeader />
				<MainSubheader />
				<MainView />
			</CookiesProvider>
		);
	}
}

export default App;
