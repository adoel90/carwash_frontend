import React from 'react';
import { CafeType } from '../components/Cafe';

import { connect } from 'react-redux';
import {
	getAllCafeMenu,
	getCafeMenuList,
	createCafeTransaction
} from '../actions/cafe.action';

import {
	authenticateMember
} from '../actions/member.action';

class CafeTypeContainer extends React.Component {
	constructor() {
		super();
		this.getAllCafeMenu = this.getAllCafeMenu.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleIndexedInputChange = this.handleIndexedInputChange.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		this.handlePaymentConfirmation = this.handlePaymentConfirmation.bind(this);
		this.handlePaymentCheckout = this.handlePaymentCheckout.bind(this);
		this.handlePaymentCheckoutSubmit = this.handlePaymentCheckoutSubmit.bind(this);
		this.handleMemberAuthentication = this.handleMemberAuthentication.bind(this);
		this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
		this.calculateGrandTotalPrice = this.calculateGrandTotalPrice.bind(this);
		this.state = {
			cafeList: [],
			selectedMenuList: [],
			searchMenu: {
				searchText: ''
			},
			memberInfo: {
				memberID: '',
				memberData: {},
				memberToken: {}
			},
			isModalOpen: {
				paymentConfirmation: false,
				paymentCheckout: false
			},
			grandTotal: 0
		}
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
	}

	componentDidUpdate = (prevProps, prevState) => {
		const {
			member,
			cafe,
			cafeList,
			toggleDialog
		} = this.props;

		if(prevProps.member.item.isAuthenticated !== member.item.isAuthenticated) {
			this.setState({
				...this.state,
				memberInfo: {
					...this.state.memberInfo,
					memberData: member.item.data,
					memberToken: member.item.accessToken
				}
			})
		}

		if(prevProps.cafe.list !== cafe.list) {
			if(cafe.list.isLoaded) {
				let activeList = []

				cafe.list.data.map((item) => {
					if(item.status) {
						item.selected = item.selected ? true : false;
						activeList.push(item);
					}
				})

				this.setState({
					...this.state,
					cafeList: activeList
				})
			}
		}

		if(prevProps.cafe.transaction !== cafe.transaction) {
			if(cafe.transaction.isPaid) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Pembayaran telah berhasil. Tunggu hingga struk transaksi dicetak sepenuhnya sebelum menutup jendela ini.',
					onConfirm: () => this.handlePrintReceipt(),
					confirmText: 'Print Ulang',
					onClose: () => window.location.reload(),
					closeText: 'Tutup'
				}

				this.handlePrintReceipt();
				toggleDialog(dialogData);
			}
		}
	}

	toggleModal = (name) => {
		const { isModalOpen } = this.state;

		this.setState({
			isModalOpen: {
				...isModalOpen,
				[name]: !isModalOpen[name]
			}
		})
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[name] = value;
		this.forceUpdate();
	}

	handleIndexedInputChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		let newObject = Object.assign({}, object);
		newObject[index][name] = parseInt(value);
		this.setState({newObject}, () => {
			this.calculateGrandTotalPrice();
		})
	}

	getAllCafeMenu = () => {
		const {
			type,
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			cafe: type.id
		}

		dispatch(getAllCafeMenu(requiredData, accessToken));
	}

	handleSelectMenu = (menu) => {
		const { selectedMenuList } = this.state;

		if(!menu.selected) {
			menu.selected = true;
			this.setState({
				...this.state,
				selectedMenuList: selectedMenuList.concat([menu])
			})
		}
		else {
			menu.selected = false;
			this.setState({
				...this.state,
				selectedMenuList: selectedMenuList.filter(item => item != menu)
			})
		}
	}

	calculateGrandTotalPrice = () => {
		const {
			selectedMenuList
		} = this.state;

		let totalPriceArray = [];
		let updatedGrandTotal;

		selectedMenuList.map((item) => {
			totalPriceArray.push(item.totalPrice);
		})

		updatedGrandTotal = totalPriceArray.reduce((a, b) => a + b, 0);

		this.setState({
			...this.state,
			grandTotal: updatedGrandTotal
		})
	}

	handlePaymentConfirmation = () => {
		this.calculateGrandTotalPrice();
		this.toggleModal('paymentConfirmation');
	}

	handlePaymentCheckout = (e) => {
		e.preventDefault();
		
		this.toggleModal('paymentCheckout');
	}

	handlePaymentCheckoutSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			memberInfo,
			selectedMenuList
		} = this.state;

		dispatch(createCafeTransaction(selectedMenuList, memberInfo.memberToken));
	}

	handlePrintReceipt = () => {
		window.print();
	}

	handleMemberAuthentication = (e) => {
		e.preventDefault();

		const { memberInfo } = this.state;
		const { dispatch } = this.props;
		
		let requiredData = {
			card: memberInfo.memberID
		}
		
		dispatch(authenticateMember(requiredData))
	}

	render() {
		return (
			<CafeType
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleIndexedInputChange={this.handleIndexedInputChange}
				handleSelectMenu={this.handleSelectMenu}
				handlePaymentConfirmation={this.handlePaymentConfirmation}
				handlePaymentCheckout={this.handlePaymentCheckout}
				handlePaymentCheckoutSubmit={this.handlePaymentCheckoutSubmit}
				handleMemberAuthentication={this.handleMemberAuthentication}
				calculateGrandTotalPrice={this.calculateGrandTotalPrice}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(CafeTypeContainer);
