import React from 'react';
import CardList from '../components/CardList';
import Card from '../components/Card';

class Carwash extends React.Component {
	constructor() {
		super();
		this.renderItem = this.renderItem.bind(this);
	}

	renderItem = (item, i) => {
		return (
			<div className="column-6 padding-top-2 padding-bottom-2">
				<Card key={i} data={item} />
			</div>
		)

	}

	render() {
		return (
			<div id="car-wash">
				<h4 className="fw-semibold">Jenis Layanan</h4>
				<p>Silahkan pilih jenis layanan yang diinginkan.</p>
				<CardList>
					{this.props.services.map(this.renderItem)}
				</CardList>
			</div>
		);
	}
}

export default Carwash;
