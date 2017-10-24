import React from 'react';
import CardList from '../components/CardList';
import Card from '../components/Card';

class ServiceItemList extends React.Component {
	constructor() {
		super();
		this.renderServiceItem = this.renderServiceItem.bind(this);
	}

	renderServiceItem = (item, i) => {
		console.log(item);

		return (
			<div key={i} className="column-6 padding-top-2 padding-bottom-2">
				<Card
					title={item.name}
					price={item.price}
					photo={item.image}
					text={item.description}
					buttonText="Pilih Layanan"
				/>
			</div>
		)
	}

	render() {
		const {
			serviceList
		} = this.props;

		return (
			<CardList>
				{ serviceList.map(this.renderServiceItem) }
			</CardList>
		)
	}
}

export default ServiceItemList;
