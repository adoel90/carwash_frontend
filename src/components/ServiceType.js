import React from 'react';
import ServiceItemList from '../components/ServiceItemList';

class ServiceType extends React.Component {
	render() {
		const {
			serviceList,
			service,
			type
		} = this.props;

		if(serviceList) {
			return (
				<div id="category">
					<div className="padding-bottom-1">
						<h5 className="fw-bold">Jenis Layanan</h5>
						<p>Silahkan pilih jenis layanan yang diinginkan.</p>
					</div>
					<ServiceItemList
						type={type} 
						serviceList={serviceList} 
					/>
				</div>
			);
		}
		return null;
	}
}

export default ServiceType;
