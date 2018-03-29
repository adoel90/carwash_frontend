import React from 'react';
import { connect } from 'react-redux';

import { CustomerStoreContentView } from '../CustomerStore';

import {
	getMenuListStore,
	createStoreTransaction,
	printStoreTransaction
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
			storeList: [],
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
			storeList,
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

		if(prevProps.store.list !== store.list) {
			if(store.list.isLoaded) {
				let activeList = []

				store.list.data.map((item) => {
					if(item.status) {
						item.selected = item.selected ? true : false;
						activeList.push(item);
					}
				})

				this.setState({
					...this.state,
					storeList: activeList
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
			accessToken
        } = this.props;
        
        let requiredData = {
			store: storeList.id
		}

		dispatch(getMenuListStore(requiredData));
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

		dispatch(createStoreTransaction(selectedMenuList, memberInfo.memberToken));
	}

	handlePrintReceipt = () => {
		const {
			store,
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: store.transaction.data.transaction
		}

		dispatch(printStoreTransaction(requiredData, accessToken));
		
		// window.print();
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