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
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			cafeTypes: {
				all: [],
				active: []
			}
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		const {
			dispatch,
			dialog,
			cafe,
			userData
		} = this.props;

		console.log(prevState);

		if(prevProps.cafe.types !== cafe.types) {
			if(cafe.types.isLoaded) {
				let activeTypes = [];

				cafe.types.data.forEach((type) => {
					if(type.status && (userData.cafe == type.id || !userData.cafe)) {
						activeTypes.push(type);
					}
				})

				this.setState({
					cafeTypes: {
						all: cafe.types.data,
						active: activeTypes
					}
				})
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

		console.log(data);

		if(!dialog.isOpened) {
			this.showDialog(data);
		}
		else {
			this.hideDialog();
		}
	}

	showDialog = (data) => {
		const { dialog, dispatch } = this.props;

		dispatch(showDialog(data))
	}

	hideDialog = () => {
		const { dialog, dispatch } = this.props;

		dispatch(hideDialog());
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

		dispatch(createCafeTransaction(dataArray, member.item.accessToken));
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
				toggleDialog={this.toggleDialog}
				showDialog={this.showDialog}
				hideDialog={this.hideDialog}
				handleInputChange={this.handleInputChange}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		member: state.member,
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(CafeContainer);
