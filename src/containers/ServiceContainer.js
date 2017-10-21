import React from 'react';
import Service from '../components/Service';

import { connect } from 'react-redux';
import { getServiceTypes } from '../actions/service.action.js';

class ServiceContainer extends React.Component {
	constructor() {
		super();
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);
	}

	addPathPropToTypes = () => {
		this.props.serviceTypes.map((type, i) => {
			type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}

	componentDidMount = () => {
		this.props.getServiceTypes();
	}

	render() {
		console.log(this.props.service);

		if(this.props.service.isLoaded) {
			this.addPathPropToTypes();
		}

		return this.props.service.isLoaded
		? <Service {...this.state} {...this.props} />
		: null;
	}
}

const mapStateToProps = (state, props) => {
	const service = state.service;
	const serviceTypes = state.service.types;

	return {
		service,
		serviceTypes
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getServiceTypes: () => dispatch(getServiceTypes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);





//
//
// this.state = {
	// categories: [
	// 	{ name: 'car-wash', title: 'Cuci Mobil' },
	// 	{ name: 'car-saloon', title: 'Salon Mobil' },
	// 	{ name: 'repair', title: 'Bengkel' }
	// ],
	// services: [
	// 	{
	// 		name: 'Paket Smart Wash',
	// 		category: 'car-wash',
	// 		price: '45000',
	// 		description: 'Pencucian eksterior luar mobil, kaca interior dan dasbor mobil.',
	// 		photo: 'http://www.chemicalguys.com/v/vspfiles/assets/images/6-29-16-InUse-FoamBlaster-Honeydew-BlackWashMitt-Tesla.jpg'
	// 	},
	// 	{
	// 		name: 'Cuci Robotic',
	// 		category: 'car-wash',
	// 		price: '30000',
	// 		description: 'Pencucian eksterior luar mobil menggunakan mesin robotik untuk pencucian cepat.',
	// 		photo: 'http://www.sato.co.id/img/NEW/SATO-Products/Robotic/Robotic-2-720x480.jpg'
	// 	},
	// 	{
	// 		name: 'Vakum Interior',
	// 		category: 'car-wash',
	// 		price: '30000',
	// 		description: 'Pembersihan keseluruhan interior mobil.',
	// 		photo: 'http://mawdetailcenter.com/wp-content/uploads/2015/10/interior-vacuum1.jpg',
	// 	},
	// 	{
	// 		name: 'Paket Hidraulik',
	// 		category: 'car-wash',
	// 		price: '60000',
	// 		description: 'Pencucian eksterior mobil hingga bagian bawah mobil menggunakan mesin hidraulik, serta pembersihan interior mobil.',
	// 		photo: 'http://4.imimg.com/data4/AB/EQ/MY-3604221/car-wash-lift-500x500.jpg'
	// 	},
	// 	{
	// 		name: 'Paket Detailing',
	// 		category: 'car-saloon',
	// 		price: '1000000',
	// 		description: 'Detailing interior dan eksterior mobil dengan pencucian lengkap.',
	// 		photo: 'http://themocracy.com/wp-content/uploads/2016/06/Auto-Detailing.jpg'
	// 	},
	// 	{
	// 		name: 'Glass Detailing',
	// 		category: 'car-saloon',
	// 		price: '200000',
	// 		description: 'Detailing seluruh kaca mobil agar tampak lebih mengkilap.',
	// 		photo: 'http://www.team-bhp.com/forum/attachments/mumbai/1356356d1427952321-windshield-polishing-detailing-glass-polish-india-ltd-chembur-mumbai-20150328_112525_img.jpg'
	// 	},
	// 	{
	// 		name: 'Car Body Detailing',
	// 		category: 'car-saloon',
	// 		price: '400000',
	// 		description: 'Detailing pada bodi atau bagian eksterior mobil agar tampak seperti baru.',
	// 		photo: 'http://www.autospa.pk/images/Exterior-Car-body-Detailing.jpg'
	// 	}
	// ]
// }
