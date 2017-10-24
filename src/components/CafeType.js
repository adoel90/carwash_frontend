import React, { Component } from 'react';

import CafeMenuList from '../components/CafeMenuList';
import SearchBar from '../components/SearchBar';

class CafeType extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
	}

	renderCafeMenuList = () => {
		const {
			cafeMenu,
			type
		} = this.props;

		return (
			<CafeMenuList
				cafeType={type}
				cafeMenuList={cafeMenu}
			/>
		)
	}

	render() {
		const {
			cafeMenu
		} = this.props;

		console.log(cafeMenu);

		return (
			<div>
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Menu</h5>
					<p className="clr-passive">Pilih menu (bisa lebih dari 1) yang dipesan oleh customer.</p>
				</div>
				<div className="padding-bottom-2">
					<SearchBar
						placeholder="Pencarian cepat..."
					/>
				</div>
				{ cafeMenu ? this.renderCafeMenuList() : <p>Sebentar ya...</p> }
			</div>
		);
	}
}

export default CafeType;
