import React, { Component } from 'react';

import { CafeMenuList } from '../Cafe';
import SearchBar from '../SearchBar';
import Heading from '../Heading';
import { Button } from '../Button';

import { Row } from '../Grid';

class CafeType extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
	}

	renderCafeMenuList = () => {
		const {
			cafe,
			cafeMenuList,
			type
		} = this.props;

		if(cafe.isLoaded) {
			return <CafeMenuList {...this.props} />
		}
	}

	render() {
		const {
			cafe,
			cafeMenuList
		} = this.props;

		return (
			<div className="inner-view">
				<Row>
					<div className="column-8">
						<div className="heading padding-bottom-2">
							<h5 className="fw-semibold">Daftar Menu</h5>
							<p className="clr-passive">Pilih menu dari daftar berikut sesuai dengan yang diinginkan customer.</p>
						</div>
					</div>
				</Row>
				{ this.renderCafeMenuList() }
			</div>
		);
	}
}

export default CafeType;
