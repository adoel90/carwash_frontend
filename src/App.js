import React from 'react';
import MainHeader from './components/MainHeader';
import MainNavigation from './components/MainNavigation';
import MainView from './components/MainView';

class App extends React.Component {
	render() {
		return (
			<main>
				<MainHeader />
				<MainNavigation />
				<MainView />
			</main>
		);
	}
}

export default App;
