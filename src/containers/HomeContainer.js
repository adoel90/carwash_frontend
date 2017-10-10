import React from 'react';
import Home from '../components/Home';

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			counter: 0,
			value: 'Hey click me plox?',
		}
	}

	handleClick() {
		this.setState({
			counter: this.state.counter + 1
		})
	}


	render() {
		console.log(this.state);

		return <Home {...this.state} handleClick={this.handleClick} />
	}
}

export default HomeContainer;
