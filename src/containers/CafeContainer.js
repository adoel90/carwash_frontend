import React from 'react';
import Cafe from '../components/Cafe';
import CafeLunch from '../components/CafeLunch';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			sidenavItems: [
				{ title: 'Cafe Siang', path: '/cafe/lunch' },
				{ title: 'Cafe Malam', path: '/cafe/dinner' }
			]
		}
	}

	render() {
		return <Cafe {...this.state} {...this.props} />
	}
}

export default CafeContainer;
