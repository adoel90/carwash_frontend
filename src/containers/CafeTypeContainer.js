import React from 'react';
import { CafeType } from '../components/Cafe';

import { connect } from 'react-redux';
import {
	getAllCafeMenu,
	getCafeMenuList
} from '../actions/cafe.action';

class CafeTypeContainer extends React.Component {
	constructor() {
		super();
		this.getAllCafeMenu = this.getAllCafeMenu.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleIndexedInputChange = this.handleIndexedInputChange.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		this.calculateGrandTotalPrice = this.calculateGrandTotalPrice.bind(this);
		this.handlePaymentConfirmation = this.handlePaymentConfirmation.bind(this);
		this.state = {
			cafeList: [],
			isModalOpen: {
				paymentConfirmation: false,
				paymentProcess: false
			},
			selectedMenuList: [],
			searchMenu: {
				searchText: ''
			},
			grandTotalPrice: '',
		}
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
	}

	componentDidUpdate = (prevProps) => {
		const {
			cafe,
			cafeList
		} = this.props;

		if(prevProps.cafe.list !== cafe.list) {
			if(cafe.list.isLoaded) {
				let activeList = []

				cafe.list.data.map((item) => {
					if(item.status) {
						activeList.push(item);
					}
				})

				this.setState({
					cafeList: activeList
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

		object[index][name] = parseInt(value);
		this.forceUpdate();
	}

	handlePaymentConfirmation = () => {
		this.calculateGrandTotalPrice();

		this.toggleModal('paymentConfirmation');
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
			selectedMenuList,
			grandTotalPrice
		} = this.state;

		selectedMenuList.map((item) => {
			let total = grandTotalPrice + item.totalPrice;

			this.setState({
				grandTotalPrice: total
			})
		})
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
				calculateGrandTotalPrice={this.calculateGrandTotalPrice}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		// cafeList: state.cafe.list
	}
}

export default connect(mapStateToProps)(CafeTypeContainer);
