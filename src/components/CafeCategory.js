import React from 'react';
import CardList from '../components/CardList';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

class CafeCategory extends React.Component {
	constructor() {
		super();
		this.renderMenuCard = this.renderMenuCard.bind(this);
	}

	renderMenuCard = () => {
		return this.props.items
			.filter((item) => {
				console.log(this.props.category);
				return this.props.category.name === item.category;
			})
			.map((item, i) => {
				return (
					<div className="column-6 padding-bottom-1 padding-top-2">
						<Card
							title={item.name}
							price={item.price}
							photo={item.photo}
							description={item.description}
							buttonText="Pilih Menu"
						/>
					</div>
				)
			})
	}

	render() {
		console.log(this.props);

		return (
			<div id="cafe-category">
				<div className="padding-bottom-3">
					<h5 className="fw-semibold">{this.props.category.title}</h5>
				</div>
				<div className="padding-bottom-1">
					<SearchBar
						addon={ <i className="icon fi flaticon-search-1"></i> }
						placeholder="Cari menu makanan..."
					/>
				</div>
				<CardList>
					{this.renderMenuCard()}
				</CardList>
			</div>
		);
	}
}

export default CafeCategory;
