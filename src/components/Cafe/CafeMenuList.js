import React, { Component } from 'react';
import {
	Card,
	CardList,
	CardHeading,
	CardImage,
	CardBody,
	CardFooter
} from '../Card';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Table } from 'reactstrap';
import Button from '../Button';
import Currency from '../Currency';
import { CafeFooter } from '../Cafe';

class CafeMenuList extends Component {
	constructor() {
		super();
		this.renderCafeMenu = this.renderCafeMenu.bind(this);
		this.toggleCartModal = this.toggleCartModal.bind(this);
		this.renderCartMenuItem = this.renderCartMenuItem.bind(this);
		this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
		this.state = {
			isCartModalOpen: false,
			cartMenu: [],
			totalPrice: ''
		}
	}

	calculateTotalPrice = () => {
		const { cartMenu } = this.state;
		let priceArr = [];

		cartMenu.map((item) => {
			priceArr.push(parseInt(item.price));
		})

		var sum = priceArr.reduce((a, b) => {
			return a + b;
		})

		this.setState({ totalPrice: sum })
	}

	renderCartMenuItem = (item) => {
		return (
			<tr>
				<td>{item.name}</td>
				<td>{item.quantity}</td>
				<td>{item.price}</td>
			</tr>
		)
	}

	selectMenu = (menu) => {
		const { cartMenu } = this.state;

		if(!menu.selected) {
			menu.selected = true;
			this.addMenuToCart(menu);
		} else {
			menu.selected = false;
			this.removeMenuFromCart(menu);
		}
	}

	addMenuToCart = (menu) => {
		const { cartMenu } = this.state;

		this.setState({
			cartMenu: cartMenu.concat([menu])
		})
	}

	removeMenuFromCart = (menu) => {
		const { cartMenu } = this.state;
		const filteredMenu = cartMenu.filter((item) => {
			return item != menu
		})

		this.setState({
			cartMenu: filteredMenu
		})
	}

	toggleCartModal = () => {
		const { isCartModalOpen } = this.state;
		this.calculateTotalPrice();

		return this.setState({ isCartModalOpen: !isCartModalOpen})
	}

	toggleModal = (key) => {
		const { isModalOpen } = this.state;

		return this.setState({
			isModalOpen: {
				[key]: !isModalOpen
			}
		})
	}

	renderCafeMenu = (menu, i) => {
		if(!menu.selected) {
			menu.selected = false;
		}

		menu.quantity = 1;

		return (
			<div key={i} className="column-6 padding-top-2 padding-bottom-2">
				<Card>
					<CardHeading>
						<h6 className="card__title">{menu.name}</h6>
						<h4 className="card__price">
							<Currency value={menu.price} />
						</h4>
					</CardHeading>
					<CardImage src={menu.image} alt={menu.title} />
					<CardBody>
						<p className="card__text">{menu.description}</p>
					</CardBody>
					<CardFooter>
						<Button buttonType="button" buttonTheme={menu.selected ? 'dark' : 'primary'} buttonFull onClick={this.selectMenu.bind(this, menu)}>
							<small className="tt-uppercase fw-bold ls-base">{menu.selected ? 'Terpilih' : 'Pilih Menu'}</small>
						</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}

	render() {
		const {
			cafeType,
			cafeMenuList
		} = this.props;

		const {
			cartMenu
		} = this.state;

		return (
			<div>
				<CardList>
					{ cafeMenuList.map(this.renderCafeMenu) }
				</CardList>
				<CafeFooter className="flex align-items--center justify-content--center">
					<Button buttonTheme="primary" buttonSize="small" buttonFull onClick={this.toggleCartModal} disabled={!cartMenu.length}>
						<small className="fw-semibold tt-uppercase ls-base">Lanjutkan ke Pembayaran ({cartMenu.length})</small>
					</Button>
					<Modal isOpen={this.state.isCartModalOpen} toggle={this.toggleCartModal}>
						<ModalHeader align="center">
							<h5 className="fw-semibold">Detail Pembayaran</h5>
						</ModalHeader>
						<ModalContent>
							<Table>
								<thead>
									<tr>
										<th>Menu</th>
										<th>Quantity</th>
										<th>Harga</th>
									</tr>
								</thead>
								<tbody>
									{ cartMenu.map(this.renderCartMenuItem) }
								</tbody>
							</Table>
							<div className="flex justify-content--space-between" style={{padding: '15px'}}>
								<h6 className="fw-semibold">Total</h6>
								<h5 className="clr-primary fw-semibold">
									<Currency value={this.state.totalPrice} />
								</h5>
							</div>
						</ModalContent>
						<ModalFooter>
							<div className="flex justify-content--space-between">
								<Button className="margin-right-1" buttonTheme="danger" buttonSize="small" buttonFull onClick={this.toggleCartModal}>
									<small className="fw-semibold tt-uppercase ls-base">Tutup</small>
								</Button>
								<Button className="margin-left-1" buttonTheme="primary" buttonSize="small" buttonFull>
									<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
								</Button>
							</div>
						</ModalFooter>
					</Modal>
				</CafeFooter>
			</div>
		)
	}

}

export default CafeMenuList;
