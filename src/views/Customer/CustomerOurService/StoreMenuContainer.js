import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { StoreMenu } from '../../../components/Service';
import Currency from '../../../components/Currency';
import { connect } from 'react-redux';
import { getMenuListStore, createMenuTransaction, getPrintStoreTransaction} from '../../../actions/store.action';
import { memberLogout } from '../../../actions/member.action';

function mapStateToProps(state) {
    return {
		storeState : state.storeState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
		// getStoreListDispatch: () => dispatch(getStoreList()),
		getMenuListStoreState : (data) => dispatch(getMenuListStore(data)),
		createMenuTransactionDispatch: (data) => dispatch(createMenuTransaction(data)),
		memberLogoutDispatch: () => dispatch(memberLogout()),
		getPrintStoreTransactionDispatch : (data) => dispatch(getPrintStoreTransaction(data))
    }
}

class StoreMenuContainer extends React.Component {
	constructor() {
		super();
		// this.getAllService = this.getAllService.bind(this);
		// this.handleMemberLogout = this.handleMemberLogout.bind(this);
		// this.handleStoreMenuPayment = this.handleStoreMenuPayment.bind(this);
		this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
		this.handleServicePaymentSubmit = this.handleServicePaymentSubmit.bind(this);
		this.getMenuListStore = this.getMenuListStore.bind(this);
		this.createMenuTransaction = this.createMenuTransaction.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		
		this.handlePaymentConfirmation = this.handlePaymentConfirmation.bind(this);
		this.calculateGrandTotalPrice=this.calculateGrandTotalPrice.bind(this);
		this.memberLogout = this.memberLogout.bind(this);
		this.getPrintStoreTransaction = this.getPrintStoreTransaction.bind(this);
		// this.getStoreList = this.getStoreList.bind(this);
		// this.handlePaymentCheckout = this.handlePaymentCheckout.bind(this);

		this.state = {
			serviceList: [],
			selectedMenu: {},
			printData: {},
			isModalOpen: {
				paymentConfirmation: false,
				// paymentProcess: false
				paymentCheckout: false
			},

			storeActiveMenuList:[],
			selectedMenuList :[],

			tables: {
				columns:[],
				rows:[],
				limit: 10
			},
			selectedMenuToPay:{},
			storeActive: 0,
			storeActiveList:{}
		}
	}

	componentDidMount = () => {

		this.getMenuListStore();	
	}

    getStoreList = () => {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }

	getMenuListStore = () => {
		const { getMenuListStoreState} = this.props;
		const requiredData = {
			id: this.props.type.id
		}
		getMenuListStoreState(requiredData);
	}

	componentDidUpdate = (prevProps) => {

		const { printData, storeActive} = this.state;
		const {	service, toggleDialog, showDialog, storeState, memberLogoutDispatch } = this.props;
	
		/* Version-01 */

		//#Get Store List 
		if(prevProps.storeState.store !== storeState.store){
            if(storeState.store.isLoaded){

                this.setState({
                    ...this.state,
                    storeActiveList: storeState.store.data.data.result.store
                }, () => {
					// getMenuStoreListDispatch(storeState.store.data.data.result.store[storeActive]);
					console.log(this.state);
					
                });
            }
        }

		//#Get Store Menu List
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

		if(prevProps.storeState.transaction !== storeState.transaction) {
			if(storeState.transaction.isPaid) {

				console.log(storeState.transaction);
				

				let dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: `Transaksi Anda telah berhasil. Silahkan tunggu hingga struk pembayaran tercetak sepenuhnya sebelum menutup pesan ini. Terima kasih dan sampai jumpa kembali.`,
					onConfirm: () => this.handlePrintReceipt(),
					// onConfirm: () => this.getPrintStoreTransaction(),					
					confirmText: 'Print Ulang',
					onClose: () => memberLogoutDispatch(),
					closeText: 'Selesai',
				}
				
				showDialog(dialogData);
				this.handlePrintReceipt();
			}
		}

		if(prevProps.storeState.print !== storeState.print) {
			if(storeState.print.isPrinted) {
				this.setState({
					...this.state,
					printData: storeState.print.data
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



	memberLogout = () => {
		/* Only declare this function so that NOT ERROR */
	}

	// handleStoreMenuPayment = (item) => {
		
	// 	this.setState({
	// 		selectedMenu: item
	// 	}, () => this.toggleModal('paymentConfirmation'))
	// }

	//#
	createMenuTransaction = (data) => {
		/* Only declare this function so that NOT ERROR */
	}

	//#
	handleServicePaymentSubmit = (e) => {
		e.preventDefault();
		const {	selectedMenu, selectedMenuToPay, storeActiveList, storeActive} = this.state;
		const { toggleDialog, hideDialog, createMenuTransactionDispatch, storeState } = this.props;

		const requiredData = {
			menu: selectedMenuToPay,
			store: storeState.store.data.data.result.store[storeActive]
		}

		let dialogData = {
			type: 'confirm',
			title: 'Konfirmasi Ulang',
			message: 'Lanjutkan pembayaran ? ',
			onClose: () => hideDialog(),
			closeText: 'Kembali',
			confirmText: 'Ya, Lanjutkan',
			onConfirm: () => {
				createMenuTransactionDispatch(requiredData)
			}
		}
		toggleDialog(dialogData);
	}


	getPrintStoreTransaction = () => {
		/* Only declare this function so that NOT ERROR */
	}

	//#Print v1
	handlePrintReceipt = () => {

		const { service, accessToken, dispatch, storeState, getPrintStoreTransactionDispatch } = this.props;
		console.log("Get Print ");
		console.log(storeState.transaction.data.result.id);

		let requiredData = {
			id: storeState.transaction.data.result.id
		}
	
		getPrintStoreTransactionDispatch(requiredData);

	}

	handleSelectMenu = (menu) => {
		const { selectedMenuList } = this.state;
		if(!menu.selected) {
			menu.selected = true;
			this.setState({
				...this.state,
				selectedMenuList: selectedMenuList.concat([menu])
			})
		} else {
			menu.selected = false;
			// this.setState({
			// 	...this.state,
			// 	selectedMenuList: selectedMenuList.filter(item => item != menu)
			// })
		}
	}

	handlePaymentConfirmation = () => {
		this.calculateGrandTotalPrice();
		this.toggleModal('paymentConfirmation');
		
	}

	// handlePaymentCheckout = (e) => {
	// 	e.preventDefault();

	// 	console.log(e);
	// 	this.toggleModal('paymentCheckout');
	// }

	calculateGrandTotalPrice = () => {
		const { selectedMenuList } = this.state;
		let totalPriceArray = [];
		let updatedGrandTotal;

		selectedMenuList.map((item) => {
			totalPriceArray.push(item.totalPrice);
		})

		updatedGrandTotal = totalPriceArray.reduce((a, b) => a + b, 0);

		this.setState({
			...this.state,
			grandTotal: updatedGrandTotal,
			selectedMenuToPay: selectedMenuList
		}, ()=> {
			console.log(this.state);
		})
	}

	render() {
		return (
			<StoreMenu
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				// handleMemberLogout={this.handleMemberLogout}
				// handleStoreMenuPayment={this.handleStoreMenuPayment}
				// handleServicePaymentConfirm={this.handleServicePaymentConfirm}
				handleServicePaymentSubmit={this.handleServicePaymentSubmit}
				// getMenuListStore= {this.getMenuListStore}
				handleSelectMenu = {this.handleSelectMenu}
				handlePaymentConfirmation= {this.handlePaymentConfirmation}
				calculateGrandTotalPrice={this.calculateGrandTotalPrice}
				// handlePaymentCheckout={this.handlePaymentCheckout}
			/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreMenuContainer);
