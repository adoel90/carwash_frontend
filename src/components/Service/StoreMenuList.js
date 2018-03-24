import React from 'react';
import { ServicePaymentConfirmation, StorePaymentDetail } from '../Service';
// import { Card, CardList, CardHeading, CardImage,CardBody, CardFooter } from '../Card';
import { Card, CardList, CardListFooter, CardHeading, CardImage,CardBody, CardFooter } from '../../components/Card';
// import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../../components/Button';
import Currency from '../Currency';
import { Icon } from '../Icon';
import { Form } from '../Form';
import { NavLink } from '../Nav';
import { default as NoThumbnail } from '../../assets/images/no-thumbnail.jpg'
import { Column, Row } from '../../layouts/Grid';
import { PageBlock } from '../Page';

 
class StoreMenuList extends React.Component {

	constructor() {

		super();
		this.renderMenuItem = this.renderMenuItem.bind(this);
		// this.renderServiceItem = this.renderServiceItem.bind(this);
		// this.renderCheckoutTotalSelectedMenu = this.renderCheckoutTotalSelectedMenu.bind(this);

	}

	renderMenuItem = (menu, i) => {

		const { handleStoreMenuPayment, handleSelectMenu, isToggleOn} = this.props;
		// const text = this.props.liked ? 'Menu Sudah di Pilih' : 'Pilih';
		const text = this.props.liked ? 'Menu Sudah di Pilih' : 'Pilih';
		
		//Feature Search
		let dataStoreMenuArrayObject = this.props.storeState.storemenu.isLoaded ? this.props.storeState.storemenu.data.data.result.menu : null;
		let filteredMenu = dataStoreMenuArrayObject.filter((menu)=> {
			// console.log(menu);
		})

		menu.selected = menu.selected ? true : false;
		menu.quantity = menu.quantity ? menu.quantity : 1;
		menu.totalPrice = menu.quantity * menu.price;

		return (
		
			<Column key={i} md={6} sm={12}>
				<Card>
					<CardHeading align="center">
						<h5 className="card__title">{menu.name}</h5>
						<h4 className="card__price">
							<Currency value={menu.price} />
						</h4>
					</CardHeading>
					<CardImage src={menu.image ? menu.image : NoThumbnail } alt={menu.title} />
					<CardBody>
						<p className="card__text">{menu.description}</p>
					</CardBody>
					<CardFooter>
					
						<Button
							type="button"
							// theme={menu.selected ? 'secondary' : 'primary'}
							key={i}
							buttonFull
							onClick={() => handleSelectMenu(menu)}>
								{/* <small className={`tt-uppercase fw-bold ls-base ${menu.selected ? 'clr-dark' : 'clr-light'}`}>{menu.selected ? 'Terpilih' : 'Pilih'}</small> */}
								<small>{menu.selected ? 'Terpilih' : 'Pilih'}</small>
								{/* {this.props.isToggleOn[menu] ? 'ON' : 'OFF'} */}

						</Button>
					</CardFooter>
				</Card>
			{/* </div> */}
			</Column>
		)
	}

	render() {

		const {
			serviceList,
			selectedService,
			storeState,
			storeList,
			selectedMenuList
		} = this.props;		

		const renderMenuList = () => {
			
			//Get Menus Store
			let dataStoreMenuArrayObject = this.props.storeState.storemenu.isLoaded ? this.props.storeState.storemenu.data.data.result.menu : null;
			const dataMenuStores = [];

			if(this.props.storeState.storemenu.isLoaded){ 
					
				dataStoreMenuArrayObject.map((data, i) => {
					
					let dataMenuStore = {
						id : data.id,
						name: data.name,
						description:data.description,
						price: data.price,
						image: data.image,
						status:data.status,
						// selected: null
					}
				
					dataMenuStores.push(dataMenuStore);
					
				});
			}

			//Render Menus & jumlah menu yang terpilih
			if(dataMenuStores.length){
				return (
					<CardList>
						{ dataMenuStores.map(this.renderMenuItem) }
						{/* {renderMenu()} */}
						{renderCheckoutTotalSelectedMenu()}
						<StorePaymentDetail {...this.props} />
					</CardList>
				)
			} else {
				return (
					<PageBlock className="flex flex-column ta-center justify-content--center align-items--center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Refresh browser page untuk menampilkan pilihan menu</p>
					</PageBlock>
				)
			}
		}

		//#
		const renderCheckoutTotalSelectedMenu = () => {

			const {handlePaymentConfirmation, selectedMenuList} = this.props;

			return (
				<CardListFooter className="flex align-items--center justify-content--center">
					<Button 
						type="button" 
						buttonTheme="secondary" 
						className="margin-right-2" 
						disabled={!selectedMenuList.length} 
						onClick={handlePaymentConfirmation}>
							<small className="tt-uppercase ls-base fw-semibold clr-dark">Konfirmasi Pembayaran {selectedMenuList.length ? `( ${selectedMenuList.length} Terpilih )` : null}</small>
					</Button>
					{/* <h1>Hai</h1> */}
				</CardListFooter>
			)
		}
		
		return (
			<div>
				{/* {renderSearchBar()} */}
				{renderMenuList()}
			</div>
		)
	}
}

export default StoreMenuList;