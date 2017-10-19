import React from 'react';

import CardList from '../components/CardList';
import Card from '../components/Card';

class SelfServiceCategory extends React.Component {
	constructor() {
		super();
		this.renderService = this.renderService.bind(this);
	}

	renderService = () => {
		return this.props.services
			.filter((service) => {
				return service.category === this.props.category.name;
			})
			.map((service, i) => {
				const card = {
					name: service.name,
					photo: service.photo,
					description: service.description,
					price: service.price
				}

				return (
					<div key={i} className="column-6 padding-top-2 padding-bottom-2">
						<Card
							title={service.name}
							price={service.price}
							photo={service.photo}
							description={service.description}
							buttonText="Pilih Layanan"
						/>
					</div>
				)
			})
	}

	render() {
		return (
			<div id="category">
				<div className="padding-bottom-1">
					<h5 className="fw-bold">Jenis Layanan</h5>
					<p>Silahkan pilih jenis layanan yang diinginkan.</p>
				</div>
				<CardList>
					{ this.renderService() }
				</CardList>
			</div>
		);
	}
}

export default SelfServiceCategory;
