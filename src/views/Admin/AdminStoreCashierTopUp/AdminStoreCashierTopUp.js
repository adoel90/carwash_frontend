import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Currency from '../../../components/Currency';
import { Dialog } from '../../../components/Dialog';
import  {CashierTopUp}  from '../AdminStoreCashierTopUp';
import { kasirTopUpLogin, getBonusTaxiOnline, printMemberTransaction } from '../../../actions/store.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { memberCustomerTopup } from '../../../actions/member.action'
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { log } from 'util';

function mapStateToProps(state) {
    return {
        storeState: state.store,
        dialog: state.dialog,
        member: state.member
    };
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators({ printMemberTransaction, kasirTopUpLogin, openDialog, closeDialog, memberCustomerTopup, getBonusTaxiOnline }, dispatch)
    }
}

class AdminStoreCashierTopUp extends Component {

    constructor(){
        
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleTopupSubmit = this.handleTopupSubmit.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.handleTopUpPaymentCheckout = this.handleTopUpPaymentCheckout.bind(this);
        this.handlePrintReceipt = this.handlePrintReceipt.bind(this);
        this.handleTierTopup = this.handleTierTopup.bind(this);

        this.state = {
			authData: {
				cardID: ''
            },
            
            authenticatedMember: {
				data: {},
				isAuthenticated: false
            },
            accessTokenMember:{},
            
            isModalOpen: {
                topup: false,
                topupConfirm: false,
                topUpPaymentCheckout: false
            },
            error: {
				data: {},
				isError: false
            },
            topupData: {
				balance: '',
				payment: 1
			},
			paymentMethod: [
				{ id: 1, name: 'Cash' },
				{ id: 2, name: 'Debit' },
				{ id: 3, name: 'Credit' }
            ],
            bonus: {},
            printData: {}
		}
    }

    componentDidMount(){
        const { action } = this.props;
        action.getBonusTaxiOnline();
    }
    
    componentDidUpdate = (prevProps) => {
        const { storeState, member } = this.props;
        const { isModalOpen } = this.state;

        if(prevProps.storeState.userData !== storeState.userData){
            if(storeState.isAuthenticated){
                this.setState({
                    ...this.state,
                    authenticatedMember: {
                        data : storeState.userData.member,
                        isAuthenticated : storeState.userData.accessToken ? true : false
                    },
                    accessTokenMember: storeState.userData

                }, () => {
                    // console.log(this.state);
                    this.forceUpdate();
                    this.handleTopUp();     
                })         
            }   
        }

        if(prevProps.storeState.bonus !== storeState.bonus){
            if(storeState.bonus.isLoaded){
                this.setState({
                    ...this.state,
                    bonus: storeState.bonus.data.result.tier
                })
            }
        }

        //Waiting success pay to top-up
        if(prevProps.member.item !== member.item){
            setTimeout(function() {

                if(member.item.isBalanceChanged){
                    let dialogData = {
                        type: 'success',
                        title: 'Berhasil Menambahkan Saldo',
                        message: 'Saldo telah berhasil di tambahkan. Tunggu hingga struk transaksi dicetak sepenuhnya sebelum menutup jendela ini.',
                        onConfirm: () => this.handlePrintReceipt(),
                        confirmText: 'Print Ulang',
                        onClose: () => window.location.reload(),
                        closeText: 'Tutup'
                    }
                    this.toggleDialog(dialogData)
                    this.handlePrintReceipt();
                }
                
                
                if (member.item.isError) {
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Maaf, SALDO gagal di tambahkan. Silahkan panggil Administrator untuk memperbaiki.',
                        onClose: () => this.toggleDialog(),
                        closeText: 'Kembali'
                    }
                    this.toggleDialog(dialogData);
                }
            }.bind(this), 1000);
        }

        //#Print this file
        if(prevProps.storeState.printMember !== storeState.printMember){
            if(storeState.printMember.isPrinted){
                this.setState({
                    ...this.state,
                    printData: storeState.printMember.data
                }, () => {
                    window.print();
                })
            }
        };
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
    
    handleAuthentication = (e) => {
        e.preventDefault();
        const { action } = this.props;
        const {authData } = this.state;
        
        let firstData = authData.cardID.replace('%', "");
        let finalDataCardId = firstData.replace('?', "");
    
        let requireData = {
            cardID: finalDataCardId
        }
        
        action.kasirTopUpLogin(requireData);
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
    
    handleTopUp = () => {
        this.toggleModal('topup');
    }

    toggleDialog = (data) => {

		const { dialog, action } = this.props;

		if(!dialog.isOpened) {
            action.openDialog(data)
		}
		else {
            action.closeDialog(data);
		}
	}
    
    renderDialog = () => {

        const { dialog, toggleDialog } = this.props;
        
        return (

            <Dialog
                isOpen={dialog.isOpened}
                toggle={toggleDialog}
                type={dialog.data.type}
                title={dialog.data.title}
                message={dialog.data.message}
                onConfirm={dialog.data.onConfirm}
                confirmText={dialog.data.confirmText}
                onClose={dialog.data.onClose}
                closeText={dialog.data.closeText}
            />
        )
    }

    handleTopupSubmit = (e) => {

        const {
			topupData,
			paymentMethod,
            authenticatedMember,
            toggleDialog,
            closeDialog,
            accessTokenMember
        } = this.state;

        e.preventDefault();

        const { action, user } = this.props;          

		let requiredData = {
			balance: parseInt(topupData.balance.replace(/,/g, '')),
            payment: topupData.payment,
            staff: user.level.id
        }
        action.memberCustomerTopup(requiredData, accessTokenMember.accessToken);
        // console.log(topupData);
        // console.log(requiredData);
    }

    //#
    handleTopUpPaymentCheckout = (e) => {
        e.preventDefault();
        this.toggleModal('topUpPaymentCheckout');
    }

    handlePrintReceipt = () => {
        const { action, member } = this.props;

        let requireData = {
            id : member.item.data.result.transaction
        }
        action.printMemberTransaction(requireData);
    }

    //#
    handleTierTopup = (tier) => {

        let nominalTopUpTaxi = parseInt(tier.price.replace(/,/g, ''));
        let bonusTopUpTaxi = parseInt(tier.bonus.replace(/,/g, ''));
        let totalTopUpTaxi = nominalTopUpTaxi + bonusTopUpTaxi;
        
        const { topupData, accessTokenMember} = this.state;
		const { action, user } = this.props;        

		let requiredData = {
			balance: totalTopUpTaxi,
            payment: topupData.payment,
            staff: user.level.id
        }
        action.memberCustomerTopup(requiredData, accessTokenMember.accessToken);
    }

    render() {
        return ( 
            <div>
                <CashierTopUp
                    {...this.state}
                    {...this.props}
                    toggleModal={this.toggleModal}
                    handleInputChange={this.handleInputChange}
                    handleAuthentication = { this.handleAuthentication}
                    handleTopupSubmit={this.handleTopupSubmit}
                    toggleDialog={this.toggleDialog}
                    handleTopUpPaymentCheckout = {this.handleTopUpPaymentCheckout}
                    handlePrintReceipt={this.handlePrintReceipt}
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
                    handleTierTopup= { this.handleTierTopup}
                />
                
                {this.renderDialog()}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminStoreCashierTopUp);