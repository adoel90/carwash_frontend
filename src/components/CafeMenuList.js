import React, { Component } from 'react';

import Card from '../components/Card';
import CardList from '../components/CardList';

class CafeMenuList extends Component {
	constructor() {
		super();
		this.renderCafeMenu = this.renderCafeMenu;
	}

	renderCafeMenu = (menu, i) => {
		console.log(menu);

		return (
			<div key={i} className="column-6 padding-top-2 padding-bottom-2">
				<Card
					title={menu.name}
					price={menu.price}
					photo={menu.image}
					text={menu.description}
					buttonText="Pilih Menu"
				/>
			</div>
		)
	}

	render() {
		const {
			cafeType,
			cafeMenuList
		} = this.props;


		return (
			<CardList>
				{ cafeMenuList.map(this.renderCafeMenu) }
			</CardList>
		)
	}

}

export default CafeMenuList;
