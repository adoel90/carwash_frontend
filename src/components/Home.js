import React from 'react';

class Home extends React.Component {
	constructor() {
		super();
	}

	render() {
		const {
			counter,
			value,
			handleClick
		} = this.props;

		return (
			<div id="home">
				<h1>{counter}</h1>
				<button onClick={handleClick}>{value}</button>
			</div>
		)
	}
}

export default Home;
