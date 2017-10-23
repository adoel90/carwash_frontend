import React from 'react';
import ServiceItemList from '../components/ServiceItemList';

class ServiceType extends React.Component {
	constructor() {
		super();
		this.renderServiceItemList = this.renderServiceItemList.bind(this);
	}

	renderServiceItemList = () => {
		const {
			serviceList
		} = this.props;

		return (
			<ServiceItemList
				type={type}
				serviceList={serviceList}
			/>
		)
	}

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
						<h5 className="fw-semibold">Jenis Layanan</h5>
						<p className="clr-passive">Silahkan pilih jenis layanan yang diinginkan.</p>
					</div>
					{ this.renderServiceItemList() }
				</div>
			);
		}
		return null;
	}
}

export default ServiceType;
