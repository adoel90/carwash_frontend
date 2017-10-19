import React from 'react';

import CardList from '../components/CardList';
import Card from '../components/Card';

class SelfServiceCategory extends React.Component {
	constructor() {
		super();
		this.renderServiceCard = this.renderServiceCard.bind(this);
	}

	renderServiceCard = () => {
		this.props.services
			.filter((service) => {
				return service.category === this.props.category.name
			})
			.map((service, i) => {
				console.log(service);
			})

		// return (
		// 	<div key={i} className="column-6 padding-top-2 padding-bottom-2">
		// 		<Card data={service} />
		// 	</div>
		// )
	}

	render() {
		return (
			<div id="category">
				<div className="padding-bottom-1">
					<h5 className="fw-bold">Jenis Layanan</h5>
					<p>Silahkan pilih jenis layanan yang diinginkan.</p>
				</div>
				<CardList>
					{ this.renderServiceCard() }
				</CardList>
			</div>
		);
	}
}

export default SelfServiceCategory;
