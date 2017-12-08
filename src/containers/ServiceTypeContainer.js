import React from 'react';
import { ServiceType } from '../components/Service';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Currency from '../components/Currency';

import { connect } from 'react-redux';
import {
	getAllService,
	getServiceList,
	createServiceTransaction
} from '../actions/service.action';

import {
	memberLogout
} from '../actions/member.action';

class ServiceTypeContainer extends React.Component {
	constructor() {
		super();
		this.getAllService = this.getAllService.bind(this);
		this.handleMemberLogout = this.handleMemberLogout.bind(this);
		this.handleServicePayment = this.handleServicePayment.bind(this);
		this.handleServicePaymentSubmit = this.handleServicePaymentSubmit.bind(this);
		this.state = {
			isModalOpen: false,
			selectedService: {}
		}
		this.state = {
			serviceList: [],
			selectedService: {},
			isModalOpen: {
				paymentConfirmation: false,
				paymentProcess: false
			},
		}
	}

	componentDidMount = () => {
		this.getAllService();
	}

	componentDidUpdate = (prevProps) => {
		const {
			service,
			toggleDialog
		} = this.props;
		
		if(prevProps.service.list !== service.list) {
			if(service.list.isLoaded) {
				let activeList = [];

				service.list.data.map((item) => {	
					if(item.status) {
						activeList.push(item);
					}
				})

				this.setState({
					...this.state,
					serviceList: activeList
				})
			}
		}
		
		if(prevProps.service.transaction !== service.transaction) {
			if(service.transaction.isPaid) {

				let balance = <Currency value={service.transaction.data.balance} />

				let dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: `Transaksi Anda telah berhasil. Silahkan tunggu hingga struk pembayaran tercetak sepenuhnya sebelum menutup pesan ini. Terima kasih dan sampai jumpa kembali.`,
					closeText: 'Keluar',
					onClose: () => this.handleMemberLogout()
				}

				toggleDialog(dialogData);
			}
		}
	}
	
	getAllService = () => {
		const {
			accessToken,
			member,
			dispatch,
			type
		} = this.props;

		const requiredData = {
			type: type.id,
		}

		dispatch(getAllService(requiredData, accessToken));
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

	handleMemberLogout = () => {
		const {
			match,
			dispatch
		} = this.props;

		return <Redirect from={`${match.url}`} to="/logout" />
	}

	handleServicePayment = (item) => {
		console.log(item);
		
		this.setState({
			selectedService: item
		}, () => this.toggleModal('paymentConfirmation'))

	}

	handleServicePaymentSubmit = (e) => {
		e.preventDefault();
		
		const {
			selectedService
		} = this.state;
		
		const { 
			dispatch, 
			accessToken 
		} = this.props;

		const requiredData = {
			service: selectedService.id
		}

		dispatch(createServiceTransaction(requiredData, accessToken));
	}

	render() {
		return (
			<ServiceType
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleMemberLogout={this.handleMemberLogout}
				handleServicePayment={this.handleServicePayment}
				handleServicePaymentConfirm={this.handleServicePaymentConfirm}
				handleServicePaymentSubmit={this.handleServicePaymentSubmit}
			/>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		service: state.service
	};
}

export default connect(mapStateToProps)(ServiceTypeContainer);
