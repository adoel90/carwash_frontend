import React from 'react';
import ServiceItemList from '../components/ServiceItemList';

class ServiceType extends React.Component {
	constructor() {
		super();
		this.renderServiceItemList = this.renderServiceItemList.bind(this);
	}

	renderServiceItemList = () => {
		const {
			serviceList,
			type
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
			type
		} = this.props;

		return (
			<div id="category">
				<div className="heading padding-bottom-1">
					<h5 className="fw-semibold">Jenis Layanan</h5>
					<p className="clr-passive">Silahkan pilih jenis layanan yang diinginkan.</p>
				</div>
				{ serviceList ? this.renderServiceItemList() : <p>Sebentar ya...</p> }
			</div>
		)
	}
}

export default ServiceType;
