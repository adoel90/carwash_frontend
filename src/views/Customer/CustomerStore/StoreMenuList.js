import React, { Component } from 'react';
import {
	Card, CardList, CardListFooter,
	CardHeading, CardImage,
	CardBody, CardFooter
} from '../../../components/Card';
import { Container, Row, Column } from '../../../layouts/Grid';
import { PageBlock } from '../../../components/Page';
import SearchBar from '../../../components/SearchBar';
import Currency from '../../../components/Currency';
import { Button } from '../../../components/Button';
import { default as NoThumbnail } from '../../../assets/images/no-thumbnail.jpg';

class StoreMenuList extends Component {
	render() {
		const {
			store,
			storeList,
			storeMenuList,
			searchMenu,
			selectedMenuList,
			handleInputChange,
			handleSelectMenu,
			handlePaymentConfirmation,
			calculateGrandTotalPrice
		} = this.props;

		const renderSearchBar = () => {
			return storeMenuList.length
			? <SearchBar
				name="searchText"
					placeholder="Masukkan nama menu..."
					onChange={(e) => handleInputChange(searchMenu, e)}
				/>
			: null
		}

		const renderMenuList = () => {
			if(storeMenuList.length) {
				return (
					<CardList>
						<Row style={{width: '100%', marginBottom: '80px'}}>
							{renderMenu()}
						</Row>
						{/* {renderCheckoutButton()} */}
					</CardList>
				)
			}
			else {
				return (
					<PageBlock className="flex align-center justify-content--center align-items--center" style={{marginLeft: '-15px', marginRight: '15px'}}>
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Tidak dapat menemukan data pada kategori ini.</p>
					</PageBlock>
				)
			}
		}

		const renderMenu = () => {
			let filteredMenu = storeMenuList.filter((menu) => {
				return menu.name.toLowerCase().includes(searchMenu.searchText.toLowerCase())
			})

			if(!filteredMenu.length) {
				return (
					<div className="align-center" style={{width: '100%', padding: '30px 15px'}}>
						<p className="clr-passive">Tidak dapat menemukan hasil pencarian untuk <span className="fw-semibold">{searchMenu.searchText}</span>.</p>
					</div>
				)
			}

			return filteredMenu
				.map((menu, i) => {
					menu.selected = menu.selected ? true : false;
					menu.quantity = menu.quantity ? menu.quantity : 1;
					menu.totalPrice = menu.quantity * menu.price;

					const menuDiscountPercent = () => {
						if(menu.trueDiscount > 0) {
							return (<h5 className="clr-secondary fw-medium margin-left-small">({menu.trueDiscount}% Off)</h5>)
						}
					}

					const menuTruePrice = () => {
						if(menu.trueDiscount > 0) {
							return (
								<p className="currency currency-base flex align-items--center justify-content--center fw-semibold clr-gray" style={{textDecoration: 'line-through'}}>
									<Currency value={menu.truePrice} />
								</p>
							)
						}
					}

					return (
						<Column md={4} key={i} className="padding-top-base padding-bottom-base">
							<Card>
								<CardHeading className="align-center">
									<h5 className="fw-semibold">{menu.name}</h5>
										<p className="currency currency-large flex align-items--center justify-content--center fw-semibold clr-primary">
											<Currency value={menu.price} />
											{ menuDiscountPercent() }
										</p>
										{ menuTruePrice() }
								</CardHeading>
								<CardImage src={menu.image ? menu.image : NoThumbnail } alt={menu.title} />
								<CardBody>
									<p className={!menu.description ? 'clr-muted' : null }>{menu.description ? menu.description : 'Tidak terdapat deskripsi.'}</p>
								</CardBody>
								<CardFooter>
									<Button
										type="button"
										theme={menu.selected ? 'secondary' : 'primary'}
										size="large"
										block
										onClick={() => handleSelectMenu(menu)}>
										<small className="tt-uppercase fw-bold ls-base clr-light">
											Pilih
										</small>
									</Button>
									{/* <Button
										type="button"
										theme={menu.selected ? 'secondary' : 'primary'}
										size="large"
										block
										onClick={() => handleSelectMenu(menu)}>
										<small className={`tt-uppercase fw-bold ls-base ${menu.selected ? 'clr-dark' : 'clr-light'}`}>{menu.selected ? 'Terpilih' : 'Pilih'}</small>
									</Button> */}
								</CardFooter>
							</Card>
						</Column>
					)
				})

		}

		const renderCheckoutButton = () => {
			return (
				<CardListFooter className="flex align-items--center justify-content--center">
					<Button type="button" buttonTheme="secondary" className="margin-right-2" disabled={!selectedMenuList.length} onClick={handlePaymentConfirmation}>
						<small className="tt-uppercase ls-base fw-semibold clr-dark">Konfirmasi Pembayaran {selectedMenuList.length ? `( ${selectedMenuList.length} Terpilih )` : null}</small>
					</Button>
					{/* <p className="clr-primary fw-bold">{selectedMenuList.length ? `${selectedMenuList.length} Terpilih` : null}</p> */}
				</CardListFooter>
			)
		}

		return (
			<div>

				{/* In here feature Search */}
				{/* {renderSearchBar()} */}
				{renderMenuList()}
			</div>
		);
	}

}

export default StoreMenuList;