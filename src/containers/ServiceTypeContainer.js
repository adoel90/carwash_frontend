import React from 'react';
import { Route } from 'react-router-dom';

import { ServiceType } from '../components/Service';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Currency from '../components/Currency';

import { connect } from 'react-redux';
import {
	getAllService,
	getServiceList,
	createServiceTransaction,
	printServiceTransaction
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
		this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
		this.state = {
			serviceList: [],
			selectedService: {},
			printData: {},
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
			printData
		} = this.state;

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
				
				this.handlePrintReceipt();
			}
		}

		if(prevProps.service.print !== service.print) {
			if(service.print.isPrinted) {
				this.setState({
					...this.state,
					printData: service.print.data
				}, () => {
					window.print();
				})
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
			dispatch,
			history
		} = this.props;

		return history.push('/logout');
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

	handlePrintReceipt = () => {
		const {
			service,
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: service.transaction.data.transaction
		}

		dispatch(printServiceTransaction(requiredData, accessToken));
	}

	render() {
		return (
			<ServiceType
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				// handleMemberLogout={this.handleMemberLogout}
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
