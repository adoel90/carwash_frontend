import React from 'react';
import { Cafe } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action.js';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.getCafeTypes = this.getCafeTypes.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		this.handlePaymentDetail = this.handlePaymentDetail.bind(this);
		this.handlePaymentDetailSubmit = this.handlePaymentDetailSubmit.bind(this);

		this.state = {
			selectedMenus: [],
			paymentProcess: {
				card: ''
			},
			isModalOpen: {
				paymentDetail: false,
				paymentProcess: false
			}
		}
	}

	componentDidMount = () => {
		this.getCafeTypes();
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

	handlePaymentDetail = () => {
		this.toggleModal('paymentDetail');
	}

	handlePaymentDetailSubmit = (e) => {
		e.preventDefault();

		this.toggleModal('paymentProcess');
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

		console.log(selectedMenus);
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
				handleInputChange={this.handleInputChange}
				handleSelectMenu={this.handleSelectMenu}
				handlePaymentDetail={this.handlePaymentDetail}
				handlePaymentDetailSubmit={this.handlePaymentDetailSubmit}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeTypes: state.cafe.types
	}
}

export default connect(mapStateToProps)(CafeContainer);
