import React from 'react';
import MainHeader from './components/MainHeader';
import MainView from './components/MainView';

class App extends React.Component {
	render() {
		return (
			<main>
				<MainHeader />
				<MainView />
			</main>
		);
	}
}

export default App;
