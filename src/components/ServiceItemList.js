import React from 'react';
import CardList from '../components/CardList';
import Card from '../components/Card';

class ServiceItemList extends React.Component {
	constructor() {
		super();
		this.filterItemByCategory = this.filterItemByCategory.bind(this);
		this.renderServiceItem = this.renderServiceItem.bind(this);
	}

	filterItemByCategory = (service) => {
		return this.props.category.name === service.category;
	}

	renderServiceItem = (service, i) => {
		return (
			<div className="column-6 padding-top-1 padding-bottom-1">
				<Card
					title={service.name}
					photo={service.photo}
					text={service.description}
					buttonText="Pilih Menu"
				/>
			</div>
		)
	}

	render() {
		return (
			<CardList>
				{/* { this.props.services
					.filter(this.filterItemByCategory)
					.map(this.renderServiceItem)
				} */}
			</CardList>
		)
	}
}

export default ServiceItemList;
