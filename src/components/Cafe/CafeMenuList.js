import React, { Component } from 'react';
import {
	Card,
	CardList,
	CardListFooter,
	CardHeading,
	CardImage,
	CardBody,
	CardFooter
} from '../Card';
import { PageBlock } from '../Page';
import Currency from '../Currency';
import { Button } from '../Button';

class CafeMenuList extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
		this.renderCafeMenu = this.renderCafeMenu.bind(this);
		this.state = {
			limit: 10
		}
	}

	renderCafeMenuList = () => {
		const {
			type,
			cafe,
			cafeMenuList,
			selectedMenus,
			handlePaymentDetail
		} = this.props;

		const {
			limit
		} = this.state;

		if(cafe.isLoaded) {
			if(cafeMenuList.length > 0) {
				return (
					<CardList>
						{ cafeMenuList
							.map(this.renderCafeMenu)
							.slice(0, limit)
						}
						<CardListFooter>
							<Button buttonTheme="primary" buttonFull className="clr-light" disabled={!selectedMenus.length} onClick={handlePaymentDetail}>
								<small className="tt-uppercase ls-base fw-semibold">Lanjut ke Pembayaran ({selectedMenus.length})</small>
							</Button>
						</CardListFooter>
					</CardList>
				)
			}
			else {
				return (
					<PageBlock className="flex flex-column align-items--center ta-center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Tidak terdapat menu pada kategori <span className="fw-semibold">{type.name}</span>.</p>
					</PageBlock>
				)
			}
		}
	}

	renderCafeMenu = (menu, i) => {
		const {
			selectMenu,
			cafeMenuList
		} = this.props;

		if(!menu.selected) {
			menu.selected = false;
		}

		if(!menu.quantity) {
			menu.quantity = 1;
		}

		menu.totalPrice = menu.quantity * menu.price;

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

		return this.renderCafeMenuList();

	}

}

export default CafeMenuList;
