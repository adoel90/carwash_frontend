import React from 'react';
import ServiceItemList from '../components/ServiceItemList';

class ServiceType extends React.Component {
	render() {
		console.log(this.props.asd.services.data);

		return null;

		// return (
		// 	<div id="category">
		// 		<div className="padding-bottom-1">
		// 			<h5 className="fw-bold">Jenis Layanan</h5>
		// 			<p>Silahkan pilih jenis layanan yang diinginkan.</p>
		// 		</div>
		// 		<ServiceItemList services={service.services.data} type={this.props.type} />
		// 	</div>
		// );
	}
}

export default ServiceType;
