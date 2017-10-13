import React from 'react';
import SelfService from '../components/SelfService';

class SelfServiceContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			sidenavItems: [
				{ title: 'Cuci Mobil', path: '/self-service/car-wash' },
				{ title: 'Salon Mobil', path: '/self-service/car-saloon' },
				{ title: 'Cek Saldo', path: '/self-service/check-balance' }
			]
		}
	}

	render() {
		return <SelfService {...this.state} {...this.props} />
	}
}

export default SelfServiceContainer;
