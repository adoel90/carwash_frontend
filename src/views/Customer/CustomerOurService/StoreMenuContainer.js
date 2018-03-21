import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { StoreMenu } from '../../../components/Service';
import Currency from '../../../components/Currency';
import { connect } from 'react-redux';

import { getMenuListStore, createMenuTransaction } from '../../../actions/store.action'

// import {memberLogout } from '../actions/member.action';
// import {memberLogout } from '../../../actions/member.action';


function mapStateToProps(state) {

    return {
		storeState : state.storeState,

    };
}

function mapDispatchToProps(dispatch) {

    return {

		getMenuListStoreState : (data) => dispatch(getMenuListStore(data)),
		createMenuTransactionDispatch: (data) => dispatch(createMenuTransaction(data))
        
    }
}

class StoreMenuContainer extends React.Component {
	constructor() {
		super();
		// this.getAllService = this.getAllService.bind(this);
		// this.handleMemberLogout = this.handleMemberLogout.bind(this);
		this.handleStoreMenuPayment = this.handleStoreMenuPayment.bind(this);
		this.handleServicePaymentSubmit = this.handleServicePaymentSubmit.bind(this);
		// this.handlePrintReceipt = this.handlePrintReceipt.bind(this);

		this.getMenuListStore = this.getMenuListStore.bind(this);
		this.createMenuTransaction = this.createMenuTransaction.bind(this);

		this.state = {
			serviceList: [],
			selectedMenu: {},
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
	
		if(prevProps.storeState.storemenu !== storeState.storemenu){
			if(storeState.storemenu.isLoaded){
				let activeMenus = [];

				storeState.storemenu.data.data.result.menu.map(item => {
					if(item.status){
						activeMenus.push(item);
					}
				});
				
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

	//handleButton
	handleStoreMenuPayment = (item) => {
		
		this.setState({
			selectedMenu: item
		}, () => this.toggleModal('paymentConfirmation'))

	}

	//#
	createMenuTransaction = (data) => {
		const { createMenuTransactionDispatch} = this.props;
		
		// console.log(requiredData);
		createMenuTransactionDispatch(data);
	}

	//#
	handleServicePaymentSubmit = (e) => {
		e.preventDefault();
		
		const {
			selectedMenu
		} = this.state;
		
		const { 
			// dispatch, 
			// accessToken,
			toggleDialog,
			hideDialog
		} = this.props;


		/*

			"dataArray" di pakai untuk di kirim ke stage "Action"

			***
				const dataArray= [];

				const requiredData = {
					menu: selectedMenu.id,
					quantity: selectedMenu.quantity
				}

				dataArray.push(requiredData);


			***


		*/

	

		let dialogData = {
			type: 'confirm',
			title: 'Konfirmasi Ulang',
			message: 'Lanjutkan pembayaran ? ',
			onClose: () => hideDialog(),
			closeText: 'Kembali',
			confirmText: 'Ya, Lanjutkan',
			onConfirm: () => {
				// dispatch(createServiceTransaction(requiredData, accessToken));
				// createMenuTransaction(requiredData)

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
			<StoreMenu
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				// handleMemberLogout={this.handleMemberLogout}
				handleStoreMenuPayment={this.handleStoreMenuPayment}
				// handleServicePaymentConfirm={this.handleServicePaymentConfirm}
				handleServicePaymentSubmit={this.handleServicePaymentSubmit}
				// getMenuListStore= {this.getMenuListStore}
			/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreMenuContainer);
