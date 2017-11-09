import React from 'react';
import ServiceItemList from '../components/ServiceItemList';
import { PageBlock } from '../components/Page';
import { Row } from '../components/Grid';
import { Button } from '../components/Button';
import Currency from '../components/Currency';
import { default as WalletIcon } from '../assets/icons/Business/wallet-1.svg';

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
				{...this.props}
			/>
		)
	}

	render() {
		const {
			serviceList,
			type,
			member
		} = this.props;

		return (
			<div className="inner-view" id="category">
				{ serviceList ? this.renderServiceItemList() : null }
			</div>
		)
	}
}

export default ServiceType;
