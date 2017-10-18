import React from 'react';
import SelfService from '../components/SelfService';

class SelfServiceContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: [
				{
					id: 1,
					name: 'car-wash',
					title: 'Cuci Mobil'
				},
				{
					id: 2,
					name: 'car-saloon',
					title: 'Salon Mobil'
				}
			]
		}
	}

	render() {
		return <SelfService {...this.state} {...this.props} />
	}
}

export default SelfServiceContainer;
