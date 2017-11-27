import React from 'react';
import { Cafe } from '../components/Cafe';

import { connect } from 'react-redux';
import {
	getCafeTypes,
	createCafeTransaction
} from '../actions/cafe.action.js';


import {
	showDialog,
	hideDialog
} from '../actions/dialog.action';

import {
	authenticateMember
} from '../actions/member.action';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.getCafeTypes = this.getCafeTypes.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		this.handleSearchFilter = this.handleSearchFilter.bind(this);
		this.handleSearchFilterSubmit = this.handleSearchFilterSubmit.bind(this)
		this.handlePaymentDetail = this.handlePaymentDetail.bind(this);
		this.handlePaymentDetailSubmit = this.handlePaymentDetailSubmit.bind(this);
		this.handlePaymentProcessSubmit = this.handlePaymentProcessSubmit.bind(this);
		this.handlePaymentMemberAuthentication = this.handlePaymentMemberAuthentication.bind(this);
		this.calculateGrandTotal = this.calculateGrandTotal.bind(this);

		this.state = {
			selectedMenus: [],
			paymentProcess: {
				card: ''
			},
			searchText: '',
			grandTotal: '',
			isModalOpen: {
				paymentDetail: false,
				paymentProcess: false
			}
		}
	}

	componentDidUpdate = (prevProps) => {
		const {
			dispatch,
			dialog,
			cafe
		} = this.props;

		if(prevProps.cafe !== this.props.cafe) {
			if(cafe.isPaid) {

				let dialogData = {
					success: {
						type: 'success',
						title: 'Pembayaran Berhasil',
						message: 'Proses pembayaran terhadap pesanan customer berhasil. Klik tombol berikut untuk mencetak struk pembayaran.',
						onClose: () => window.location.reload(),
						closeText: 'Kembali'
					}
				}

				this.toggleDialog(dialogData.success);
			}
		}
	}


	componentDidMount = () => {
		this.getCafeTypes();
	}

	toggleDialog = (data) => {
		const {
			dialog,
			dispatch
		} = this.props;

		if(!dialog.isOpened) {
			dispatch(showDialog(data))
		}
		else {
			dispatch(hideDialog())
		}
	}

	calculateGrandTotal = () => {
		const {
			selectedMenus
		} = this.state;

		let priceArray = [];

		selectedMenus.map((menu, i) => {
			priceArray.push(menu.totalPrice);
		})

		let sum = priceArray.reduce((a, b) => {
			return a + b;
		})

		this.setState({
			grandTotal: sum
		})
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

		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
	}

	handleSearchFilter = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			...this.state,
			[name]: value
		})
	}

	handleSearchFilterSubmit = () => {
		const {
			searchText
		} = this.props
	}

	handlePaymentDetail = () => {
		this.toggleModal('paymentDetail');
	}

	handlePaymentDetailSubmit = (e) => {
		e.preventDefault();

		this.toggleModal('paymentProcess');
	}

	handlePaymentProcessSubmit = (e) => {
		const {
			dispatch,
			accessToken,
			member
		} = this.props;

		const {
			selectedMenus
		} = this.state;

		e.preventDefault();

		let dataArray = [];

		selectedMenus.map((menu, i) => {
			let requiredData = {
				id: menu.id,
				quantity: menu.quantity
			}

			dataArray.push(requiredData);
		})

		dispatch(createCafeTransaction(dataArray, member.accessToken));
	}

	handlePaymentMemberAuthentication = (e) => {
		const {
			paymentProcess
		} = this.state;

		const {
			dispatch
		} = this.props;

		e.preventDefault();

		let requiredData = {
			card: paymentProcess.card
		}

		dispatch(authenticateMember(requiredData));
	}

	handleSelectMenu = (menu) => {
		const {
			selectedMenus
		} = this.state;

		if(!menu.selected) {
			menu.selected = true;
			this.setState({
				selectedMenus: selectedMenus.concat([menu])
			})
		}
		else {
			menu.selected = false;
			let filteredMenu = selectedMenus.filter((item) => {
				return item != menu
			})

			this.setState({
				selectedMenus: filteredMenu
			})
		}
	}


	getCafeTypes = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getCafeTypes(accessToken));
	}

	render() {
		return (
			<Cafe
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				toggleDialog={this.toggleDialog}
				handleInputChange={this.handleInputChange}
				handleSearchFilter={this.handleSearchFilter}
				handleSearchFilterSubmit={this.handleSearchFilterSubmit}
				handleSelectMenu={this.handleSelectMenu}
				handlePaymentDetail={this.handlePaymentDetail}
				handlePaymentDetailSubmit={this.handlePaymentDetailSubmit}
				handlePaymentProcessSubmit={this.handlePaymentProcessSubmit}
				handlePaymentMemberAuthentication={this.handlePaymentMemberAuthentication}
				calculateGrandTotal={this.calculateGrandTotal}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeTypes: state.cafe.types,
		member: state.member,
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(CafeContainer);
