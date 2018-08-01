import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStoreList, getMenuListStore, printStoreTransaction, createStoreTransaction} from '../../../actions/store.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { authenticateMember } from '../../../actions/member.action';

import { ModalDialog } from '../../../components/Modal';
import { AdminTransactionSuperAdmView } from '../AdminTransactionSuperAdm';



function mapStateToProps(state) {
    return {
        store: state.store,
        member: state.member,
        dialog: state.dialog
    };
};

function mapDispatchToProps(dispatch) {
    return {
        // getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreListDispatch: () => dispatch(getStoreList()),
        getMenuListStoreDispatch : (data) => dispatch(getMenuListStore(data)),
        // getMenuStoreListDispatch : (data) => dispatch(getMenuStoreList(data)),
        // getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        // action: bindActionCreators({ updateMenuVendor, openDialog, closeDialog, changeMenuStatus  }, dispatch)
        action: bindActionCreators({authenticateMember, openDialog, closeDialog, printStoreTransaction, createStoreTransaction }, dispatch)
    };
};

class AdminTransactionSuperAdm extends Component {

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind(this);
        this.handleSelectMenu = this.handleSelectMenu.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.handleIndexedInputChange = this.handleIndexedInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePaymentCheckout = this.handlePaymentCheckout.bind(this);
        this.handlePaymentCheckoutSubmit = this.handlePaymentCheckoutSubmit.bind(this);
        this.handleMemberAuthentication = this.handleMemberAuthentication.bind(this);
        this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
        this.calculateGrandTotalPrice = this.calculateGrandTotalPrice.bind(this);
        this.handlePrintMenuSelected = this.handlePrintMenuSelected.bind(this);
        this.openDialog = this.openDialog.bind(this);

        this.state = {
            storeActiveList : {},
            listMenuStore : {},
            storeIdTab: {},
            selectedMenu: {},
            printData: {},
            dataTransaction: {
                discount: 0,
                increase: false,
                markup: 0
            },
            memberInfo: {
                memberID: '',
				memberData: {},
				memberToken: {}
			},
            selectedMenuItem : [],
            grandTotal: 0,
            isChecked: false,
            statusPrintDataConfirm:null,
            isModalOpen: {
				paymentConfirmation: false,
				paymentCheckout: false
            },
            labelState: {},
            isChecked: false,
            statusPrintDataConfirm:null
        };
    };

    componentDidMount = () => {
        const { getStoreListDispatch } = this.props;

        // let requiredData = {
        //     active: true
        // };
        getStoreListDispatch();
    };

    componentDidUpdate(prevProps){
        const { store, member} = this.props;
        const { storeActiveList } = this.state;

        //#GET STORE LIST
        if(prevProps.store.list !== store.list){   
            if(store.list.isLoaded){
                this.setState({  
                    ...this.state,
                    storeActiveList: store.list.isLoaded ? store.list.data.data.result.store : null
                });
            };
        };

        //Get Menu List•••••
        if(prevProps.store.storemenu !== store.storemenu){
            if(store.storemenu.isLoaded){
                this.setState({
                    ...this.state,
                    listMenuStore: store.storemenu
                });
            };
        };

        if(prevProps.store.transaction !== store.transaction) {
			if(store.transaction.isPaid) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Pembayaran telah berhasil. Tunggu hingga struk transaksi dicetak sepenuhnya sebelum menutup jendela ini.',
					onConfirm: () => this.handlePrintReceipt(),
					confirmText: 'Print Ulang',
                    onClose: () => window.location.reload(),
                    // onClose: () => window.location.origin,
					closeText: 'Tutup'
				}

				this.toggleDialog(dialogData);
				this.handlePrintReceipt();
			};
		};

		if(prevProps.store.print !== store.print) {
			if(store.print.isPrinted) {
				this.setState({
					...this.state,
					printData: store.print.data
				}, () => {
					window.print();
				})
			}
        };
        
        //#
        if(prevProps.member.item !== member.item) {
			if(member.item.isAuthenticated) {
				this.setState({
					...this.state,
					memberInfo: {
						...this.state.memberInfo,
						memberData: member.item.data,
						memberToken: member.item.accessToken
					}
				});
			}
		};
    };

    openDialog = (data) => {
		const { dialog, action } = this.props;
		action.openDialog(data);
    };
    
    closeDialog = () => {
		const { dialog, action } = this.props;

		action.closeDialog();
    }

    //#
    toggleModal = (name) => {
        const { isModalOpen } = this.state;
        
		this.setState({
			isModalOpen: {
				...isModalOpen,
				[name]: !isModalOpen[name]
			}
		});
    };
    
    toggleDialog = (data) => {
		const { dialog, dispatch } = this.props;

		if(!dialog.isOpened) {
			this.openDialog(data);
		} else {
			this.closeDialog();
		};
    };
    
    renderDialog = () => {
		const {
			dialog,
			toggleDialog,
			isDialogOpen
		} = this.props;

		return (
			<ModalDialog
				isOpen={dialog.isOpened}
				toggle={toggleDialog}
				type={dialog.data.type}
				title={dialog.data.title}
				message={dialog.data.message}
				onConfirm={dialog.data.onConfirm}
				onClose={dialog.data.onClose}
				confirmText={dialog.data.confirmText}
				closeText={dialog.data.closeText}
			/>
		);
    };
    
    //#
    handleIndexedInputChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		let newObject = Object.assign({}, object);
		newObject[index][name] = parseInt(value);
		this.setState({newObject}, () => {
			this.calculateGrandTotalPrice();
		})
	};

    //#
    handleInputChange = (object, e) => {
		const target = e.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		object[name] = value;
        this.forceUpdate();
        this.calculateGrandTotalPrice();
    }

    //#
    handleClickChange = (e) => {

        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;
      
        //#
        let requireData = {
            id : value
        };

        const { getMenuListStoreDispatch } = this.props;
        getMenuListStoreDispatch(requireData);

        //#Set ID STORE in storeIdTab
        const { storeIdTab } = this.state;

        this.setState({
            ...this.state,
            storeIdTab: requireData.id
        });
    };

    handleSelectMenu = (menu) => {
        const { selectedMenuItem } = this.state;

		// if(!menu.selected) {
		// 	menu.selected = true;
		// 	this.setState({
		// 		...this.state,
		// 		selectedMenuItem: selectedMenuItem.concat([menu])
		// 	});
		// }
		// else {
		// 	menu.selected = false;
		// 	this.setState({
		// 		...this.state,
		// 		selectedMenuItem: selectedMenuItem.filter(item => item != menu)
        //     });
        // };
        
        //#
        if(menu.status === true    ){
            if(!menu.selected) {
                menu.selected = true;
                this.setState({
                    ...this.state,
                    selectedMenuItem: selectedMenuItem.concat([menu])
                })
            }
            else {
                menu.selected = false;
                this.setState({
                    ...this.state,
                    selectedMenuItem: selectedMenuItem.filter(item => item != menu)
                })
            }
        }
    };

    //#
    handleFormSubmit = () => {
		this.calculateGrandTotalPrice();
		this.toggleModal('paymentConfirmation');
    };

    handlePaymentCheckout = (e) => {
        e.preventDefault();
		this.toggleModal('paymentCheckout');
    };

    handlePaymentCheckoutSubmit = (e) => {

		e.preventDefault();

		const {
			dispatch,
            accessToken,
            action,
            user
        } = this.props;
        
		const {
			memberInfo,
            selectedMenuItem,
            storeIdTab,
            storeList,
            grandTotal,
            dataTransaction
        } = this.state;

        let selectedMenuItemArray = [];
        
        selectedMenuItem.map((item) => {

            // if(parseInt(dataTransaction.discount) > 0){
            if(item.totalPrice > grandTotal){         
                //#DISCOUNT       
                item.totalPrice = grandTotal;

                //#
                let discountPerItem = parseInt(item.price) * parseInt(dataTransaction.discount) / 100;
                let priceAfterDiscount = parseInt(item.price) - discountPerItem;
                item.price = priceAfterDiscount.toString();
                selectedMenuItemArray.push(item);
            } 
            
            else if(item.totalPrice < grandTotal){
            // else if(parseInt(dataTransaction.markup) > 0){
                //#MARK-UP
                item.totalPrice = grandTotal;

                //#
                let markUpPerItem = parseInt(item.price) * parseInt(dataTransaction.markup) / 100;
                let priceAfterMarkup = parseInt(item.price) + markUpPerItem;
                item.price = priceAfterMarkup.toString();

                selectedMenuItemArray.push(item);
            } else {
                selectedMenuItemArray.push(item);
            };
        });

        let requiredData = {
            menu : selectedMenuItemArray,
            store : parseInt(storeIdTab),
            token : memberInfo.memberToken,
            // staff: null
            staff: user.id
        };

        console.log(requiredData);
        action.createStoreTransaction(requiredData);
    };

    //#
    calculateGrandTotalPrice = () => {

		const { selectedMenuItem, dataTransaction } = this.state;

		let totalPriceArray = [];
		let updatedGrandTotal;

		selectedMenuItem.map((item) => {
			totalPriceArray.push(item.totalPrice);
		});
        
        updatedGrandTotal = totalPriceArray.reduce((a, b) => a + b, 0);
        
        let total;

        if(!dataTransaction.increase && dataTransaction.discount > 0) {
            total = updatedGrandTotal-(updatedGrandTotal*dataTransaction.discount/100);
        } else if(dataTransaction.markup && dataTransaction.markup > 0){
            total = updatedGrandTotal + (updatedGrandTotal*dataTransaction.markup/100)
        } else {
            total = updatedGrandTotal;
        };

		this.setState({
			...this.state,
            grandTotal: total,
            selectedMenuItem: selectedMenuItem
		});
    };

    handleMemberAuthentication = (e) => {
		e.preventDefault();
		const { memberInfo } = this.state;
        const { action } = this.props;
        
        let firstData = memberInfo.memberID.replace('%', "");
        let finalDataCardId = firstData.replace('?', "");
		
		let requiredData = {
            card: finalDataCardId
		};
		action.authenticateMember(requiredData);
    };

    handlePrintReceipt = () => {
		const {
			store,
			accessToken,
			action
		} = this.props;

		let requiredData = {
			id: store.transaction.data.result.transaction
		};
        action.printStoreTransaction(requiredData, accessToken);
    };
    
    //Fire in AdminTransactionDetail.js
    handlePrintMenuSelected = (e) => {
        e.preventDefault();
        const { selectedMenuItem } = this.state;

        this.setState({
            ...this.state,
            statusPrintDataConfirm: 200
        }, () => {
            window.print();
        });
    };

    render(){

        return (
            <div>
                <AdminTransactionSuperAdmView 
                    handleInputChange = { this.handleInputChange}
                    handleIndexedInputChange = {this.handleIndexedInputChange}
                    handleClickChange = {this.handleClickChange}
                    handleSelectMenu = { this.handleSelectMenu}
                    handleFormSubmit = { this.handleFormSubmit}
                    toggleModal = { this.toggleModal }
                    handlePaymentCheckout = {this.handlePaymentCheckout}
                    handlePaymentCheckoutSubmit={this.handlePaymentCheckoutSubmit}
                    calculateGrandTotalPrice = {this.calculateGrandTotalPrice}
                    handleMemberAuthentication={this.handleMemberAuthentication}
                    handlePrintMenuSelected={this.handlePrintMenuSelected}
                    {...this.state}
                    {...this.props}
                />

                {this.renderDialog()}
            </div>
        )
    }
};

// export default AdminTransactionSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminTransactionSuperAdm);
