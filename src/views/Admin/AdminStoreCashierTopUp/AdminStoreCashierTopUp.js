import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Currency from '../../../components/Currency';
import { Dialog } from '../../../components/Dialog';
import  {CashierTopUp}  from '../AdminStoreCashierTopUp';
import { kasirTopUpLogin, getBonusTaxiOnline, printMemberTransaction, getSaldoBonus} from '../../../actions/store.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { memberCustomerTopup } from '../../../actions/member.action';
import { getUserList } from '../../../actions/user.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { log } from 'util';


function mapStateToProps(state) {
    return {
        storeState: state.store,
        dialog: state.dialog,
        member: state.member,
        userState: state.user
    }
};

function mapDispatchToProps(dispatch) {

    return {
        getUserListDispatch: (data) => dispatch(getUserList(data)),
        getSaldoBonusDispatch : (data) => dispatch(getSaldoBonus(data)),
        action: bindActionCreators({ printMemberTransaction, kasirTopUpLogin, openDialog, closeDialog, memberCustomerTopup, getBonusTaxiOnline }, dispatch)
    }
};

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
        this.handleTopUpMember = this.handleTopUpMember.bind(this);
        this.handleTopUpTaxiOnline = this.handleTopUpTaxiOnline.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);

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
            printData: {},
            memberNominal: {},
            customerBonus:{},
            optionTopUpMember: {},
            optionTopUpMemberThemeButton: false,
            kasirList:{},
            showHideIntefaceIsiUlang: false,
            kasirId: {}     
		}
    };

    componentDidMount(){
        // const { action, getSaldoBonusDispatch } = this.props;
        // getSaldoBonusDispatch();

        //#Code Dropdownlist to see list of kasir
        const { getUserListDispatch } = this.props;

        let requiredData = {
            access: null,
            active: false
        };
        getUserListDispatch(requiredData);
    };
    
    componentDidUpdate = (prevProps) => {
        const { storeState, member, userState } = this.props;
        const { isModalOpen, kasirList } = this.state;

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
                    
                    //#GET SALDO BONUS
                    const { getSaldoBonusDispatch } = this.props;
                    const { authenticatedMember } = this.state;
            
                    console.log(authenticatedMember);
            
                    const jenisMember = authenticatedMember.isAuthenticated ? authenticatedMember.data.card.type.id : null;
                    
                    let requiredData = {
                        type: jenisMember
                    };
            
                    getSaldoBonusDispatch(requiredData);
                })         
            }   
        };

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
                };
                
                if (member.item.isError) {
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Maaf, SALDO gagal di tambahkan. Silahkan panggil Administrator untuk memperbaiki.',
                        onClose: () => this.toggleDialog(),
                        closeText: 'Kembali'
                    };

                    this.toggleDialog(dialogData);
                }
            }.bind(this), 1000);
        };

        //#Print this file
        if(prevProps.storeState.printMember !== storeState.printMember){
            if(storeState.printMember.isPrinted){
                this.setState({
                    ...this.state,
                    printData: storeState.printMember.data
                }, () => {
                    window.print();
                })
            };
        };

        if(prevProps.storeState.saldo !== storeState.saldo){

            if(storeState.saldo.isLoaded){
                this.setState({
                    ...this.state,
                    optionTopUpMember: storeState.saldo.data.result
                },() => {
                    console.log(this.state.optionTopUpMember);
                });
            };
        };

        //#Code Dropdownlist to see list of kasir
        if(prevProps.userState.list !== userState.list){            
            if(userState.list.isLoaded){
                
                let levelAksesIdArray = [];

                userState.list.data.data.result.map((value) => {
                    // console.log(value);
                    if(value.level.id === 3){

                        levelAksesIdArray.push(value);
                        this.setState({
                            ...this.state,
                            kasirList: levelAksesIdArray
                        }, () => {
                            console.log(this.state.kasirList);
                        });
                    } else {
                        // console.log("TAK ADA KASIR ID");
                    };
                });
            };
        };
    };

    //#
    handleClickChange = (e) => {

        e.preventDefault();

        const target = e.target;
        const name = target.name;
        const value = target.value;

        //#
        this.setState({
            ...this.state,
            kasirId: value,
            showHideIntefaceIsiUlang: true
        }, () => {
            console.log(this.state.kasirId);
        });
    };
   
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
        };
        
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
    };

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
            accessTokenMember,
            memberNominal,
            customerBonus,
            optionTopUpMember
        } = this.state;

        e.preventDefault();
        const typeMember = authenticatedMember.isAuthenticated ? authenticatedMember.data.card.type.name : null;
        const { action, user } = this.props;          
        
        if(typeMember === "Member"){ // MEMBER

            console.log(parseInt(memberNominal));
            console.log(parseInt(customerBonus));

            let dataId = user.level.id === 1 ? user.level.id + 292 : user.id; 
            
            if(!isNaN(parseInt(memberNominal))){
                let requiredData = {
                    balance:parseInt(memberNominal) + parseInt(customerBonus),
                    payment: topupData.payment,
                    staff: dataId
                };
                
                console.log("From Member");
                action.memberCustomerTopup(requiredData, accessTokenMember.accessToken);
            } else {
                alert("Anda belum isi Jumlah Top Up !");
            };

            
        } else if(typeMember === "Non-Member"){ // NON MEMBER

            if(parseInt(topupData.balance.replace(/,/g, '')) < optionTopUpMember[0].balance ){
                alert("Minimal Top Up Rp." + optionTopUpMember[0].balance + "!");
                
            } else {

                let dataId = user.level.id === 1 ? user.level.id + 292 : user.id; 

                let requiredData = {
                    balance: topupData ? parseInt(topupData.balance.replace(/,/g, '')  + parseInt(customerBonus) ): null ,
                    // balance: topupData ? parseInt(topupData.balance.replace(/,/g, '')) : null ,
                    payment: topupData.payment,
                    staff: dataId
                };
    
                console.log("From Non-Member");
                console.log(requiredData);
                action.memberCustomerTopup(requiredData, accessTokenMember.accessToken);
            };
           

        } else { // TAXI ONLINE

            let balance = optionTopUpMember.length ? optionTopUpMember[0].balance : null;
            let bonus = optionTopUpMember.length ? optionTopUpMember[0].bonus : null;
            
            let dataId = user.level.id === 1 ? user.level.id + 292 : user.id; 

            let requiredData = {
                // balance: topupData ? parseInt(topupData.balance.replace(/,/g, '')) + parseInt(customerBonus): null ,
                balance: parseInt(balance) + parseInt(bonus),
                payment: topupData.payment,
                staff: dataId
            };

            console.log("From Taxi Online");
            console.log(requiredData);
            action.memberCustomerTopup(requiredData, accessTokenMember.accessToken);
        };
    };

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
    handleTopUpMember = (topup) => {

        console.log(topup);

        this.setState({
            ...this.state,
            memberNominal: topup.balance,
            customerBonus: topup ? topup.bonus : "0",
            optionTopUpMemberThemeButton: true
        },() => {
            console.log(this.state.memberNominal);
            console.log(this.state.customerBonus);
        });
    };

    //#
    handleTopUpTaxiOnline = (topuptaxionline) => {

        this.setState({
            ...this.state,
            memberNominal: parseInt(topuptaxionline.balance),
            customerBonus: parseInt(topuptaxionline.bonus),
            optionTopUpMemberThemeButton: true
        });
    };

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
                    handleTopUpMember= { this.handleTopUpMember}
                    handleTopUpTaxiOnline = { this.handleTopUpTaxiOnline }
                    handleClickChange = {this.handleClickChange}
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