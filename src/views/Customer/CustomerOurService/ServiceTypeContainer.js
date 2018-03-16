import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { ServiceType } from '../../../components/Service';
import Currency from '../../../components/Currency';

import { connect } from 'react-redux';

import { getMenuListStore } from '../../../actions/store.action'

// import {memberLogout } from '../actions/member.action';
// import {memberLogout } from '../../../actions/member.action';


function mapStateToProps(state) {

    return {
		storeState : state.storeState,

    };
}

function mapDispatchToProps(dispatch) {

    return {

		getMenuListStoreState : (data) => dispatch(getMenuListStore(data))
        
    }
}

class ServiceTypeContainer extends React.Component {
	constructor() {
		super();
		// this.getAllService = this.getAllService.bind(this);
		// this.handleMemberLogout = this.handleMemberLogout.bind(this);
		// this.handleServicePayment = this.handleServicePayment.bind(this);
		// this.handleServicePaymentSubmit = this.handleServicePaymentSubmit.bind(this);
		// this.handlePrintReceipt = this.handlePrintReceipt.bind(this);

		this.getMenuListStore = this.getMenuListStore.bind(this);


		this.state = {

			serviceList: [],
			selectedService: {},
			printData: {},
			isModalOpen: {
				paymentConfirmation: false,
				paymentProcess: false
			}
		}
	}

	componentDidMount = () => {

		const { storeState } = this.props;
		this.getMenuListStore();
		
	}

	getMenuListStore = (requiredData) => {

		const { getMenuListStoreState} = this.props;

		const { storeId } = this.state;

		
		// let dataStoreArrayObject = this.props.storeState.store.isLoaded ? this.props.storeState.store.data.data.result.store : null;
		
		// console.log(this.props.storemenu);
		
		// const requiredData = {
		// 	id: storemenu.id
		// }
		
		// console.log(requiredData);
		console.log(storeId);
		
		
		getMenuListStoreState(storeId);
				
	}

	componentDidUpdate = (prevProps) => {

		// console.log(prevProps);

		const {
			printData
		} = this.state;

		const {
			service,
			toggleDialog,
			showDialog,
			storeState
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
				let dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: `Transaksi Anda telah berhasil. Silahkan tunggu hingga struk pembayaran tercetak sepenuhnya sebelum menutup pesan ini. Terima kasih dan sampai jumpa kembali.`,
					onConfirm: () => this.handlePrintReceipt(),
					confirmText: 'Print Ulang',
					onClose: () => this.handleMemberLogout(),
					closeText: 'Selesai',
				}
				
				showDialog(dialogData);
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
	
	// getAllService = () => {
	// 	const {
	// 		accessToken,
	// 		member,
	// 		dispatch,
	// 		type
	// 	} = this.props;

	// 	const requiredData = {
	// 		type: type.id,
	// 	}

	// 	dispatch(getAllService(requiredData, accessToken));
	// }

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
			accessToken,
			toggleDialog,
			hideDialog
		} = this.props;

		const requiredData = {
			service: selectedService.id
		}

		let dialogData = {
			type: 'confirm',
			title: 'Konfirmasi Ulang',
			message: 'Apakah Anda yakin atas pilihan Anda? (Pembayaran tidak dapat dibatalkan atau diuangkan kembali)',
			onClose: () => hideDialog(),
			closeText: 'Kembali',
			confirmText: 'Ya, Lanjutkan',
			onConfirm: () => {
				// dispatch(createServiceTransaction(requiredData, accessToken));
			}
		}

		
		toggleDialog(dialogData);
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

		// dispatch(printServiceTransaction(requiredData, accessToken));
	}

	render() {
		return (
			<ServiceType
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				// handleMemberLogout={this.handleMemberLogout}
				// handleServicePayment={this.handleServicePayment}
				// handleServicePaymentConfirm={this.handleServicePaymentConfirm}
				// handleServicePaymentSubmit={this.handleServicePaymentSubmit}
				// getMenuListStore= {this.getMenuListStore}
			/>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ServiceTypeContainer);
// export default ServiceTypeContainer;
