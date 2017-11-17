import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateMember } from '../../actions/member.action';
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
import { Button } from '../Button';
import Currency from '../Currency';
import { CafeFooter } from '../Cafe';
import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import NumberFormat from 'react-number-format';

class CafeMenuList extends Component {
	constructor() {
		super();
		this.toggleCartModal = this.toggleCartModal.bind(this);

		this.calculateTotal = this.calculateTotal.bind(this);
		this.calculateGrandTotal = this.calculateGrandTotal.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleNextStep = this.handleNextStep.bind(this);
		this.handleMemberAuthentication = this.handleMemberAuthentication.bind(this);

		this.renderCafeMenu = this.renderCafeMenu.bind(this);
		this.renderCartMenuItem = this.renderCartMenuItem.bind(this);
		this.renderCartModal = this.renderCartModal.bind(this);
		this.renderPaymentModal = this.renderPaymentModal.bind(this);
		this.renderMemberInformation = this.renderMemberInformation.bind(this);

		this.state = {
			isModalOpen: {
				cart: false,
				payment: false
			},
			cartMenu: [],
			totalPrice: '',
			cardId: '',
			member: {}
		}
	}

	calculateTotal = (index) => {
		const { cartMenu } = this.state;
		cartMenu[index].totalPrice = cartMenu[index].quantity * cartMenu[index].price;

		this.calculateGrandTotal();

		this.forceUpdate();
	}

	calculateGrandTotal = () => {
		const { cartMenu } = this.state;
		let priceArr = [];

		cartMenu.map((item) => {
			priceArr.push(parseInt(item.totalPrice));
		})

		var sum = priceArr.reduce((a, b) => {
			return a + b;
		})

		this.setState({ totalPrice: sum })
	}

	handleQuantityChange = (index, e) => {
		const { cartMenu } = this.state;
		cartMenu[index].quantity = parseInt(e.target.value);

		this.calculateTotal(index);

		this.forceUpdate();
	}

	renderCartMenuItem = (item, i) => {
		const {
			cartMenu
		} = this.state;

		return (
			<tr>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td className="flex justify-content--center">
					<Input
						name="quantity"
						type="text"
						value={item.quantity}
						onChange={this.handleQuantityChange.bind(this, i)}
						className="ta-center"
						style={{ width: '100px'}}
						selectOnFocus
					/>
				</td>
				<td className="fw-semibold">{item.totalPrice}</td>
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

	renderCafeMenu = (menu, i) => {
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
						<Button type="button" buttonTheme={menu.selected ? 'secondary' : 'primary'} buttonFull onClick={this.selectMenu.bind(this, menu)}>
							<small className={`tt-uppercase fw-bold ls-base ${menu.selected ? 'clr-dark' : 'clr-light'}`}>{menu.selected ? 'Terpilih' : 'Pilih Menu'}</small>
						</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}

	toggleCartModal = () => {
		const { isModalOpen } = this.state;
		this.calculateGrandTotal();

		return this.setState({
			isModalOpen: {
				...this.state.isModalOpen,
				cart: !isModalOpen.cart
			}
		})
	}

	handleInputChange = (e) => {
		const target = e.target
		const name = target.name;
		const value = target.value;

		this.setState({
			[name]: value
		})
	}

	handleMemberAuthentication = (e) => {
		const {
			dispatch
		} = this.props;

		const {
			cardId
		} = this.state;

		e.preventDefault();

		const requiredData = {
			card: cardId
		}

		dispatch(authenticateMember(requiredData));
	}

	handleNextStep = (e) => {
		e.preventDefault();
		this.togglePaymentModal();
	}

	togglePaymentModal = () => {
		const { isModalOpen } = this.state;

		return this.setState({
			isModalOpen: {
				payment: !isModalOpen.payment
			}
		})
	}

	renderMemberInformation = () => {
		const {
			member
		} = this.props;

		console.log(member);

		return (
			<div>
				<div className="flex flex-column align-items--center justify-content--center">
					<img src={CardIcon} style={{width: '150px'}} />
					<h4 className="fw-semibold clr-primary">{member.data.name}</h4>
					<h5 className="fw-semibold">
						<NumberFormat
							displayType={'text'}
							format="#### #### #### ####"
							value={member.data.card.id}
						/>
					</h5>
					<p className="fw-semibold">Saldo Saat Ini: {member.data.balance}</p>
				</div>
			</div>
		)
	}

	renderPaymentModal = () => {
		const { member } = this.props;
		const { isModalOpen } = this.state;

		console.log(member);

		return (
			<Modal className="modal-dialog--large" isOpen={isModalOpen.payment} toggle={this.togglePaymentModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Pembayaran</h6>
				</ModalHeader>
				<Form onSubmit={this.handlePayment}>
					<ModalContent>
						<Form onSubmit={this.handleMemberAuthentication}>
							<FormGroup>
								<Label htmlFor="cardId">Gesek Kartu Customer</Label>
								<Input
									name="cardId"
									type="number"
									onChange={this.handleInputChange}
									placeholder="Silahkan gesek kartu customer"
									autoFocus="true"
									selectOnFocus
								/>
							</FormGroup>
						</Form>
						{ member.data.id ? this.renderMemberInformation() : null }
					</ModalContent>
					<ModalFooter>
						<Button type="submit" buttonTheme="primary" buttonFull disabled={!this.props.member.data.id}>
							<small className="tt-uppercase ls-base fw-semibold">Bayar & Cetak Struk</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderCartModal = () => {
		const {
			cartMenu,
			isModalOpen
		} = this.state;

		return (
			<Modal isOpen={isModalOpen.cart} toggle={this.toggleCartModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Detail Pembayaran</h6>
				</ModalHeader>
				<Form onSubmit={this.handleNextStep}>
					<ModalContent>
						<Table>
							<thead className="thead--primary">
								<tr>
									<th>Nama Menu</th>
									<th>Harga (satuan)</th>
									<th>Jumlah</th>
									<th>Total Harga</th>
								</tr>
							</thead>
							<tbody>
								{ cartMenu.map(this.renderCartMenuItem) }
							</tbody>
						</Table>
						<div className="flex flex-column align-items--flex-end" style={{padding: '15px'}}>
							<h6>
								<small className="tt-uppercase ls-base fw-semibold">Total Pembayaran</small>
							</h6>
							<h4 className="clr-primary fw-semibold">
								<Currency value={this.state.totalPrice} />
							</h4>
						</div>
					</ModalContent>
					<ModalFooter>
						<div className="flex justify-content--space-between">
							<Button type="button" className="margin-right-1" buttonTheme="danger" buttonSize="small" buttonFull onClick={this.toggleCartModal}>
								<small className="fw-semibold tt-uppercase ls-base">Batal</small>
							</Button>
							<Button className="margin-left-1" buttonTheme="primary" buttonSize="small" buttonFull>
								<small className="fw-semibold tt-uppercase ls-base">Selanjutnya</small>
							</Button>
						</div>
					</ModalFooter>
				</Form>
			</Modal>
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
				</CafeFooter>
				{this.renderCartModal()}
				{this.renderPaymentModal()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member,
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(CafeMenuList);
