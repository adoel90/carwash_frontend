import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CustomerStoreContentView } from '../CustomerStore';

import {
	getMenuListStore,
	createStoreTransaction,
	printStoreTransaction,
	getDiscountListById
} from '../../../actions/store.action';

import {
	authenticateMember
} from '../../../actions/member.action';

class CustomerStoreContent extends React.Component {
	constructor() {
		super();
		this.getMenuListStore = this.getMenuListStore.bind(this);
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
			storeMenuList: [],
			selectedMenuList: [],
			printData: {},
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
		this.getMenuListStore();
	}

	componentDidUpdate = (prevProps, prevState) => {
		const {
			member,
			store,
			storeMenuList,
			toggleDialog
		} = this.props;

		if(prevProps.member.item !== member.item) {
			if(member.item.isAuthenticated) {
				this.setState({
					...this.state,
					memberInfo: {
						...this.state.memberInfo,
						memberData: member.item.data,
						memberToken: member.item.accessToken
					}
				})
			}
		}

		if(prevProps.store.storemenu !== store.storemenu) {
			if(store.storemenu.isLoaded) {
				let activeList = [];

				store.storemenu.data.data.result.menu.map((item) => {
					if(item.status) {
						if(store.discount.isLoaded) {
							/*** Charge for Online Member ***/
							let memberCardID = member.item.isLoaded ? member.item.data.result.card.type.id : null;
							let chargePercent = this.props.type.charge ? this.props.type.charge : 0;
							let chargeMoney = memberCardID === 15 ? (parseInt(chargePercent)*item.price)/100 : 0;

							/*** Discount calculate ***/
							let discountLength = store.discount.data.data.result.promo.length;
							let percent = discountLength > 0 ? store.discount.data.data.result.promo[0].price : 0;
							let dataDiscount = (parseInt(percent)*item.price)/100;

							let price = (item.price-dataDiscount)+chargeMoney;
							let totalPrice = (item.totalPrice-dataDiscount)+chargeMoney;
							
							let paramItem = {
								id: item.id,
								image: item.image,
								name: item.name,
								price: price,
								quantity: item.quantity,
								selected: item.selected,
								status: item.status,
								totalPrice: totalPrice
							}
							paramItem.selected = paramItem.selected ? true : false;
							activeList.push(paramItem);
						}

						// item.selected = item.selected ? true : false;
						// activeList.push(item);
					}
				})

				this.setState({
					...this.state,
					storeMenuList: activeList
				})
			}
		}

		if(prevProps.store.transaction !== store.transaction) {
			if(store.transaction.isPaid) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Pembayaran telah berhasil. Tunggu hingga struk transaksi dicetak sepenuhnya sebelum menutup jendela ini.',
					onConfirm: () => this.handlePrintReceipt(),
					confirmText: 'Print Ulang',
					onClose: () => window.location.reload(),
					closeText: 'Tutup'
				}

				toggleDialog(dialogData);
				this.handlePrintReceipt();
			}
		}

		if(prevProps.store.print !== store.print) {
			if(store.print.isPrinted) {
				this.setState({
					...this.state,
					printData: store.print.data
				}, () => {
					window.print();
				})
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

	getMenuListStore = () => {
		const {
            store,
            storeList,
			dispatch,
			type
		} = this.props;
        
        let requiredData = {
			id: type.id
		}

		let paramDiscount = {
			id: type.id,
			start_date: moment().format('YYYY-MM-DD'),
			end_date: moment().add(+1, 'month').format('YYYY-MM-DD'),
			active : true
		}

		dispatch(getDiscountListById(paramDiscount)).then(() => {
			dispatch(getMenuListStore(requiredData));
		});
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
			type,
			store
		} = this.props;

		const {
			selectedMenuList
		} = this.state;

		let requiredData = {
			menu : selectedMenuList,
			store : type
		}

		dispatch(createStoreTransaction(requiredData));
	}

	handlePrintReceipt = () => {
		const {
			store,
			dispatch
		} = this.props;

		let requiredData = {
			id: store.transaction.data.result.transaction
		}

		dispatch(printStoreTransaction(requiredData));
		
		// window.print();
	}

	handleMemberAuthentication = (e) => {
		e.preventDefault();

		const { memberInfo } = this.state;
		const { dispatch } = this.props;

		console.log(memberInfo)
		
		let requiredData = {
			card: memberInfo.memberID
		}
		
		dispatch(authenticateMember(requiredData))
	}

	render() {
		return (
			<CustomerStoreContentView
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
		store: state.store
	}
}

export default connect(mapStateToProps)(CustomerStoreContent);