import React, { Component } from 'react';
import { Card, CardList, CardHeading, CardImage, CardBody, CardFooter } from '../Card';
import Currency from '../Currency';
import { Button } from '../Button';

class CafeMenuList extends Component {
	constructor() {
		super();
		this.renderCafeMenu = this.renderCafeMenu.bind(this);
	}

	renderCafeMenu = (menu, i) => {
		const {
			selectMenu
		} = this.props;

		if(!menu.selected) {
			menu.selected = false;
		}

		if(!menu.quantity) {
			menu.quantity = 1;
			menu.totalPrice = menu.quantity * menu.price;
		}

		return (
			<div key={i} className="column-6 padding-top-2 padding-bottom-2">
				<Card>
					<CardHeading>
						<h6 className="fw-semibold">{menu.name}</h6>
						<h4 className="fw-semibold clr-primary">
							<Currency value={menu.price} />
						</h4>
					</CardHeading>
					<CardImage src={menu.image} alt={menu.title} />
					<CardBody>
						<p>{menu.description}</p>
					</CardBody>
					<CardFooter>
						<Button
							type="button"
							buttonTheme={menu.selected ? 'secondary' : 'primary'}
							buttonFull
							onClick={() => selectMenu(menu)}>
							<small className={`tt-uppercase fw-bold ls-base ${menu.selected ? 'clr-dark' : 'clr-light'}`}>{menu.selected ? 'Terpilih' : 'Pilih'}</small>
						</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}

	render() {
		const {
			cafe,
			cafeMenuList
		} = this.props;

		return (
			<div>
				<CardList>
					{ cafeMenuList.length ? cafeMenuList.map(this.renderCafeMenu) : null }
				</CardList>
			</div>
		);
	}

}

export default CafeMenuList;
