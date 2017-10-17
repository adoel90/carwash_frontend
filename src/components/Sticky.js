import React from 'react';

class Sticky extends React.Component {
	constructor() {
		super();
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		console.log(123);
		window.addEventListener('scroll', this.handleScroll);
	}

	handleScroll(e) {
		console.log(e)
	}

	render() {
		return <div>{this.props.children}</div>;
	}
}

export default Sticky;
