import React from 'react';
import Carwash from '../components/Carwash';

class CarwashContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			services: [
				{
					id: 1,
					name: 'Paket Smart Wash',
					price: '45000',
					description: 'Pencucian eksterior luar mobil, kaca interior dan dasbor mobil.'
				},
				{
					id: 2,
					name: 'Cuci Robotic',
					price: '30000',
					description: 'Pencucian eksterior luar mobil menggunakan mesin robotik untuk pencucian cepat.'
				},
				{
					id: 3,
					name: 'Vakum Interior',
					price: '30000',
					description: 'Pembersihan keseluruhan interior mobil.'
				},
				{
					id: 4,
					name: 'Paket Hidraulik',
					price: '60000',
					description: 'Pencucian eksterior mobil hingga bagian bawah mobil menggunakan mesin hidraulik, serta pembersihan interior mobil.'
				}
			]
		}
	}

	render() {
		return <Carwash {...this.props} {...this.state} />
	}
}

export default CarwashContainer;
