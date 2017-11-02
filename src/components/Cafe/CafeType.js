import React, { Component } from 'react';

import { CafeMenuList } from '../Cafe';
import SearchBar from '../SearchBar';
import Heading from '../Heading';
import Button from '../Button';

import { Row } from '../Grid';

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

		return (
			<div className="inner-view">
				<Row>
					<div className="column-8">
						<div className="heading padding-bottom-2">
							<h5 className="fw-semibold">Daftar Menu</h5>
							<p className="clr-passive">Pilih menu (bisa lebih dari 1) yang dipesan oleh customer.</p>
						</div>
					</div>
				</Row>
				<SearchBar
					className="padding-bottom-2"
					placeholder="Pencarian cepat..."
				/>
				{ cafeMenu ? this.renderCafeMenuList() : <p>Sebentar ya...</p> }
			</div>
		);
	}
}

export default CafeType;
