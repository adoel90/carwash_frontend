import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Currency from '../../../components/Currency';
import { Dialog } from '../../../components/Dialog';
import  {CashierTopUp}  from '../../../components/Cashier';
import { kasirTopUpLogin } from '../../../actions/store.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { memberCustomerTopup } from '../../../actions/member.action'
import { openDialog, closeDialog } from '../../../actions/dialog.action';


function mapStateToProps(state) {
    return {
        // authentication: state.authentication 
        storeState: state.store,
        dialog: state.dialog,
        member: state.member
    };
}

function mapDispatchToProps(dispatch) {
    return {
        kasirTopUpLogin: bindActionCreators(kasirTopUpLogin, dispatch),
        openDialogDispatch:(data) =>  dispatch(openDialog(data)),
        closeDialogDispatch: (data) => dispatch(closeDialog(data)),
        memberTopupDispatch: (data) => dispatch(memberCustomerTopup(data))
    }
}

class StoreCashierTopUp extends Component {

    constructor(){
        
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleTopupSubmit = this.handleTopupSubmit.bind(this);

        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

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
                topupConfirm: false
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
		}
    }


    //const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;

    //#Get data member yang sedang TOP UP
    componentDidUpdate(prevProps){

        const { storeState } = this.props;
        const { isModalOpen } = this.state;

        // console.log(storeState.userData)

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
                    console.log(this.state);
                    this.forceUpdate();
                    this.handleTopUp();            
                })          
            }   
        }
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
        const {kasirTopUpLogin } = this.props;
		const {authData } = this.state;
        
        let requireData = {
            cardID: authData.cardID
        }
    
        // this.toggleModal("topup");
        kasirTopUpLogin(requireData);
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

    openDialog = () => {
        /*Only Declare */
    }

    closeDialog = () => {
        /*Only Declare */
    }

    //#
    handleTopupSubmit = (e) => {
		e.preventDefault();

		const {
			topupData,
			paymentMethod,
            authenticatedMember,
            toggleDialog,
            closeDialog,
            accessTokenMember
        } = this.state;
        
        // console.log(this.state);
        // console.log(this.props);

		const { dispatch, accessToken, memberTopupDispatch, member } = this.props;        

		let requiredData = {
			balance: parseInt(topupData.balance.replace(/,/g, '')),
            payment: topupData.payment,
            dataAccessTokenMember: accessTokenMember.accessToken
		}

        // console.log(requiredData);
        
        memberTopupDispatch(requiredData).then(() => {

            const{ member } = this.props;
            // console.log("GET RESPONSE ");
            
            if(member.item.isBalanceChanged){
                let dialogData = {
					type: 'success',
					title: 'Berhasil Menambahkan Saldo',
					message: 'Saldo telah berhasil di tambahkan. Klik tombol berikut untuk kembali.',
					onClose: () => window.location.reload(),
					closeText: 'Kembali'
				}
                this.toggleDialog(dialogData)
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
        });
    }

    toggleDialog = (data) => {

		const { dialog, openDialogDispatch, closeDialogDispatch } = this.props;

		if(!dialog.isOpened) {
            openDialogDispatch(data)
		}
		else {
            closeDialogDispatch(data);
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
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
                />
                {this.renderDialog()}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreCashierTopUp);