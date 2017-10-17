import React from 'react';
import Cafe from '../components/Cafe';
import CafeLunch from '../components/CafeLunch';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			sidenavItems: [
				{ id: 1, title: 'Lunch', path: '/lunch' }
			]
		}
	}

	render() {
		return <Cafe {...this.state} {...this.props} />
	}
}

export default CafeContainer;
