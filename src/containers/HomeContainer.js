import React from 'react';
import Home from '../components/Home';

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <Home {...this.state} />
	}
}

export default HomeContainer;
