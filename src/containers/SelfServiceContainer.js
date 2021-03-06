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
			],
			services: [
				{
					id: 1,
					name: 'Paket Smart Wash',
					category: 'car-wash',
					price: '45000',
					description: 'Pencucian eksterior luar mobil, kaca interior dan dasbor mobil.',
					photo: 'http://www.chemicalguys.com/v/vspfiles/assets/images/6-29-16-InUse-FoamBlaster-Honeydew-BlackWashMitt-Tesla.jpg'
				},
				{
					id: 2,
					name: 'Cuci Robotic',
					category: 'car-wash',
					price: '30000',
					description: 'Pencucian eksterior luar mobil menggunakan mesin robotik untuk pencucian cepat.',
					photo: 'http://www.sato.co.id/img/NEW/SATO-Products/Robotic/Robotic-2-720x480.jpg'
				},
				{
					id: 3,
					name: 'Vakum Interior',
					category: 'car-wash',
					price: '30000',
					description: 'Pembersihan keseluruhan interior mobil.',
					photo: 'http://mawdetailcenter.com/wp-content/uploads/2015/10/interior-vacuum1.jpg',
				},
				{
					id: 4,
					name: 'Paket Hidraulik',
					category: 'car-wash',
					price: '60000',
					description: 'Pencucian eksterior mobil hingga bagian bawah mobil menggunakan mesin hidraulik, serta pembersihan interior mobil.',
					photo: 'http://4.imimg.com/data4/AB/EQ/MY-3604221/car-wash-lift-500x500.jpg'
				}
			]
		}
	}

	render() {
		return <SelfService {...this.state} {...this.props} />
	}
}

export default SelfServiceContainer;
