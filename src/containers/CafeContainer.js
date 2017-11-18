import React from 'react';
import { Cafe } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action.js';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.getCafeTypes = this.getCafeTypes.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handlePaymentDetail = this.handlePaymentDetail.bind(this);
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

	handlePaymentDetail = () => {
		const {
			toggleModal
		} = this.toggleModal;

		this.toggleModal('paymentDetail');
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
				handlePaymentDetail={this.handlePaymentDetail}
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
