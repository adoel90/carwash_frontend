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
			},

			storeActiveMenuList:[]
		}
	}

	componentDidMount = () => {

		const { storeState } = this.props;
		this.getMenuListStore();
		
	}

	// getMenuListStore = (requiredData) => {
	getMenuListStore = () => {

		// console.log(this.props.type.id) -------> Di sini lo mesti teliti dul liat props apaan aja yang ada.
		const { getMenuListStoreState} = this.props;
		
		const requiredData = {
			id: this.props.type.id
		}
		
		// console.log(requiredData);
		getMenuListStoreState(requiredData);
				
	}

	componentDidUpdate = (prevProps) => {

		const {
			printData
		} = this.state;

		const {
			service,
			toggleDialog,
			showDialog,
			storeState
		} = this.props;

		// console.log(this.props.storeState.storemenu);
	
		if(prevProps.storeState.storemenu !== storeState.storemenu){
			if(storeState.storemenu.isLoaded){
				let activeMenus = [];

				storeState.storemenu.data.data.result.menu.map(item => {
					if(item.status){
						activeMenus.push(item);
					}
				});

				// console.log(activeMenus);
				
				this.setState({
					...this.state,
					storeActiveMenuList: activeMenus
				})
				
			}
		}

		//#Get list service
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
