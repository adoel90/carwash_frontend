import React from 'react';
import MainHeader from './components/MainHeader';
import MainSubheader from './components/MainSubheader';
import MainView from './components/MainView';

class App extends React.Component {
	render() {
		return (
			<div>
				<MainHeader />
				<MainSubheader />
				<MainView />
			</div>
		);
	}
}

export default App;
