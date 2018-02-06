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
import SearchBar from '../SearchBar';
import { default as NoThumbnail } from '../../assets/images/no-thumbnail.jpg'

class CafeMenuList extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
		this.renderCafeMenu = this.renderCafeMenu.bind(this);
		this.filteredCafeMenu = this.filteredCafeMenu.bind(this);
		this.state = {
			limit: 10,
		}
	}

	filteredCafeMenu = (menu) => {
		const {
			searchText
		} = this.props;

		return menu.name.toLowerCase().includes(searchText.toLowerCase())
	}


	renderCafeMenuList = () => {
		const {
			type,
			cafe,
			cafeList,
			searchText,
			selectedMenuList,
			handlePaymentDetail
		} = this.props;

		const {
			limit
		} = this.state;

		if(cafe.list.isLoaded) {
			if(cafeList.length > 0) {
				return (
					<CardList>
						{ cafeList
							.filter(this.filteredCafeMenu)
							.map(this.renderCafeMenu)
							.slice(0, limit)
						}
						<CardListFooter>
							<Button buttonTheme="primary" buttonFull className="clr-light" disabled={!selectedMenuList.length} onClick={handlePaymentDetail}>
								<small className="tt-uppercase ls-base fw-semibold">Lanjut ke Pembayaran ({selectedMenuList.length})</small>
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
			handleSelectMenu,
			cafeList
		} = this.props;

		if(!menu.selected) {
			menu.selected = false;
		}

		if(!menu.quantity) {
			menu.quantity = 1;	// this sets the minimum quantity per menu item
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
					<CardImage src={menu.image ? menu.image : NoThumbnail } alt={menu.title} />
					<CardBody>
						<p className={!menu.description ? 'clr-muted' : null }>{menu.description ? menu.description : 'Tidak terdapat deskripsi.'}</p>
					</CardBody>
					<CardFooter>
						<Button
							type="button"
							buttonTheme={menu.selected ? 'secondary' : 'primary'}
							buttonFull
							onClick={() => handleSelectMenu(menu)}>
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
			cafeList,
			searchText,
			handleInputChange,
			handleSearchFilter,
			handleSearchFilterSubmit
		} = this.props;

		return (
			<div>
				<SearchBar
					name="searchText"
					value={searchText}
					placeholder="Ketik nama service untuk mencari..."
					onChange={(e) => handleSearchFilter(e)}
					// onSubmit={handleSearchFilterSubmit}
				/>
				{this.renderCafeMenuList()}
			</div>
		)

	}

}

export default CafeMenuList;
