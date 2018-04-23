import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { PropsRoute } from '../../../components/Route';
import { AdminTransactionView } from '../AdminTransaction';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { Button } from '../../../components/Button';
import { ModalDialog } from '../../../components/Modal';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { getStoreListWithIdUser, getMenuListStore, createStoreTransaction, printStoreTransaction, getDiscountListById, getMenuListStoreWithPrint  } from '../../../actions/store.action';
import { authenticateMember } from '../../../actions/member.action';

function mapStateToProps(state) {
    return {
        store: state.store,
        member: state.member,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getMenuListStoreWithPrintDispatch: (data) => dispatch(getMenuListStoreWithPrint(data)),
        getStoreListWithIdUserDispatch: () => dispatch(getStoreListWithIdUser()),
        action: bindActionCreators({ getMenuListStore, authenticateMember, createStoreTransaction, openDialog, closeDialog, printStoreTransaction }, dispatch)
    }
}

class AdminTransaction extends Component{
    
    constructor(){
        super();
        this.toggleTab = this.toggleTab.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleIndexedInputChange = this.handleIndexedInputChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSelectMenu = this.handleSelectMenu.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handlePaymentCheckout = this.handlePaymentCheckout.bind(this);
        this.handlePaymentCheckoutSubmit = this.handlePaymentCheckoutSubmit.bind(this);
		this.handleMemberAuthentication = this.handleMemberAuthentication.bind(this);
		this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
        this.calculateGrandTotalPrice = this.calculateGrandTotalPrice.bind(this);
        // this.createCheckbox =this.createCheckbox.bind(this);
        // this.createCheckboxesMap = this.createCheckboxesMap.bind(this);
        this.printListMenuStore = this.printListMenuStore.bind(this);

        this.state = {
            storeList: {},
            listMenuStore: {},
            storeIdTab: {},
            activeTab: 0,
            selectedMenu: {},
            printData: {},
			searchMenu: {
				searchText: ''
			},
            memberInfo: {
				memberID: '',
				memberData: {},
				memberToken: {}
			},
            selectedMenuItem: [],
            labelState: {},
            isModalOpen: {
				paymentConfirmation: false,
				paymentCheckout: false
            },
            grandTotal: 0,
            dataTransaction: {
                discount: 0,
                increase: false,
                markup: 0
            },
            isChecked: false
        }
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
      }

    componentDidMount(){
        const { getStoreListWithIdUserDispatch } = this.props;
        getStoreListWithIdUserDispatch();
    }

    componentDidUpdate(prevProps){
        const { member, store, dialog } = this.props;

        if(prevProps.member.item !== member.item) {
			if(member.item.isAuthenticated) {
				this.setState({
					...this.state,
					memberInfo: {
						...this.state.memberInfo,
						memberData: member.item.data,
						memberToken: member.item.accessToken
					}
				})
			}
		}

        //#Get list store id 
        if(prevProps.store.storelistspecial !== store.storelistspecial){
            if(store.storelistspecial.isLoaded){

                this.setState({
                    ...this.state,
                    storeList: store.storelistspecial,
                    storeIdTab: store.storelistspecial.data.data.result.store[0]
                }, () => {
                    // console.log(store.storelistspecial.data.data.result.store);
                    this.props.action.getMenuListStore(store.storelistspecial.data.data.result.store[0]);
                })
            }
        }
        //Get Menu List•••••
        if(prevProps.store.storemenu !== store.storemenu){
            if(store.storemenu.isLoaded){
                this.setState({
                    ...this.state,
                    listMenuStore: store.storemenu
                }, () => {
                    // console.log(this.state);
                })
            }
        }

        if(prevProps.store.transaction !== store.transaction) {
			if(store.transaction.isPaid) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Pembayaran telah berhasil. Tunggu hingga struk transaksi dicetak sepenuhnya sebelum menutup jendela ini.',
					onConfirm: () => this.handlePrintReceipt(),
					confirmText: 'Print Ulang',
					onClose: () => window.location.reload(),
					closeText: 'Tutup'
				}

				this.toggleDialog(dialogData);
				this.handlePrintReceipt();
			}
		}

		if(prevProps.store.print !== store.print) {
			if(store.print.isPrinted) {
				this.setState({
					...this.state,
					printData: store.print.data
				}, () => {
					window.print();
				})
			}
			
		}
    }

    toggleDialog = (data) => {
		const {
			dialog,
			dispatch
		} = this.props;

		if(!dialog.isOpened) {
			this.openDialog(data);
		}
		else {
			this.closeDialog();
		}
	}

	openDialog = (data) => {
		const { dialog, action } = this.props;

		action.openDialog(data);
	}

	closeDialog = () => {
		const { dialog, action } = this.props;

		action.closeDialog();
    }
    
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
		)
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

    handleSelectMenu = (menu) => {
        const { selectedMenuItem } = this.state;

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
    
    handleFormSubmit = () => {
		this.calculateGrandTotalPrice();
		this.toggleModal('paymentConfirmation');
    }

    handlePaymentCheckout = (e) => {
        e.preventDefault();
		
		this.toggleModal('paymentCheckout');
    }
    
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
            storeList
        } = this.state;

        let requiredData = {
            menu : selectedMenuItem,
            store : storeIdTab,
            token : memberInfo.memberToken,
            // staff: null
            staff: user.id
        }

        // console.log(this.props)
        // console.log(requiredData)
        action.createStoreTransaction(requiredData);
    }
    
    handleMemberAuthentication = (e) => {
		e.preventDefault();

		const { memberInfo } = this.state;
		const { action } = this.props;
		
		let requiredData = {
			card: memberInfo.memberID
		}
		
		action.authenticateMember(requiredData);
    }
    
    handlePrintReceipt = () => {
		const {
			store,
			accessToken,
			action
		} = this.props;

		let requiredData = {
			id: store.transaction.data.result.transaction
		}

        action.printStoreTransaction(requiredData, accessToken);
	}
    
    calculateGrandTotalPrice = () => {
		const {
            selectedMenuItem,
            dataTransaction
		} = this.state;

		let totalPriceArray = [];
		let updatedGrandTotal;

		selectedMenuItem.map((item) => {
			totalPriceArray.push(item.totalPrice);
		})
        
        updatedGrandTotal = totalPriceArray.reduce((a, b) => a + b, 0);
        
        let total;

        // if(!dataTransaction.increase && dataTransaction.discount > 0) {
        //     total = updatedGrandTotal-(updatedGrandTotal*dataTransaction.discount/100);
        // } else if(dataTransaction.increase && dataTransaction.discount > 0) {
        //     total = updatedGrandTotal+(updatedGrandTotal*dataTransaction.discount/100);
        // } else {
        //     total = updatedGrandTotal;
        // }

        if(!dataTransaction.increase && dataTransaction.discount > 0) {
            total = updatedGrandTotal-(updatedGrandTotal*dataTransaction.discount/100);
            console.log(total);
        } else if(dataTransaction.markup && dataTransaction.markup > 0){
            total = updatedGrandTotal + (updatedGrandTotal*dataTransaction.markup/100)
            console.log(total);
        } else {
            total = updatedGrandTotal;
            console.log(total);
        }

		this.setState({
			...this.state,
			grandTotal: total
		})
    }
    
    handleIndexedInputChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		let newObject = Object.assign({}, object);
		newObject[index][name] = parseInt(value);
		this.setState({newObject}, () => {
			this.calculateGrandTotalPrice();
		})
	}

    //#
	toggleTab = (tabIndex, type) => {

        const { action } = this.props;
        let data = { id : type.id }

        action.getMenuListStore(data);

        this.setState({
            activeTab: tabIndex,
            storeIdTab: type
		}, () => {                       
            // #
        })
    }

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
    printListMenuStore = (e) => {
        e.preventDefault();
        const { getMenuListStoreWithPrintDispatch } = this.props;
        const { storeIdTab } = this.state;

        let requiredData = {
            id: storeIdTab.id,
            print: true
        }
        
        getMenuListStoreWithPrintDispatch(requiredData);

    }

    render(){
        const { storeList, activeTab } = this.state;
        const { store, match } = this.props;

        let firstRoutePath;

        if(storeList.isLoaded) {
            firstRoutePath = storeList.data.data.result.store[0].name.replace(/\s+/g, '-').toLowerCase();
        }

         //#
         const renderTabContent = () => {

            if(storeList.isLoaded){
                if(storeList.data.data.result.store.length){

                    return storeList.data.data.result.store.map((type, i) => {
                        let path = type.name.replace(/\s+/g, '-').toLowerCase();

                        return (
                            <TabContent activeTab={activeTab} tabIndex={i}>            
                                <PropsRoute
                                    key={i}
                                    // name={type.name}
                                    // path={`${match.url}/transaction/${path}`}
                                    component={AdminTransactionView}
                                    type={type}
                                    toggleModal= {this.toggleModal}
                                    handleInputChange = {this.handleInputChange}
                                    handleIndexedInputChange = {this.handleIndexedInputChange}
                                    handleSelectMenu = {this.handleSelectMenu}
                                    handleFormSubmit = {this.handleFormSubmit}
                                    handlePaymentCheckout = {this.handlePaymentCheckout}
                                    handlePaymentCheckoutSubmit={this.handlePaymentCheckoutSubmit}
                                    handleMemberAuthentication={this.handleMemberAuthentication}
                                    calculateGrandTotalPrice = {this.calculateGrandTotalPrice}
                                    toggleTab={this.toggleTab}
                                    printListMenuStore={this.printListMenuStore}
                                    {...this.props}
                                    {...this.state}
                                />
                            </TabContent>
                        )
                    })
                }
            }
        }

        return(
            <div>           
                <Nav tabs className="flex justify-content--space-between">
                    { storeList.isLoaded ? storeList.data.data.result.store.map((store, i) => (
                        <NavItem>
                            <NavTabLink active={activeTab === i} onClick={() => this.toggleTab(i, store)}>
                                <h4>{store.name}</h4>
                            </NavTabLink>
                        </NavItem>
                    )) : null }
                </Nav>

                {/* RENDER CONTENT BASED ON ID STORE */}
                {renderTabContent()}
                {/* <Redirect from="/*" to={`${match.url}/transaction/${firstRoutePath}`} /> */}

                {/*  RENDER DIALOG BERHASIL OR NOT */}
                {this.renderDialog()}
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTransaction);