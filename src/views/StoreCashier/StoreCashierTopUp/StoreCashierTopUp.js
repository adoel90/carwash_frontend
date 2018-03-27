import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Currency from '../../../components/Currency';

import { kasirTopUpLogin } from '../../../actions/store.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { showDialog, hideDialog } from '../../../actions/dialog.action';
// import { StoreCashierTopUpView } from '../StoreCashierTopUp';
// import { CashierTopUp } from '../../../components/Cashier';
import  {CashierTopUp}  from '../../../components/Cashier';

function mapStateToProps(state) {
    return {
        // authentication: state.authentication 
        storeState: state.storeState,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        kasirTopUpLogin: bindActionCreators(kasirTopUpLogin, dispatch),
        showDialogDispatch:(data) =>  dispatch(showDialog(data)),
        hideDialogDispatch: () => dispatch(hideDialog())
    }
}

class StoreCashierTopUp extends Component {

    constructor(){
        
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        // this.handleTopUp = this.handleTopUp.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleTopupSubmit = this.handleTopupSubmit.bind(this);

        this.toggleDialog = this.toggleDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);

        this.state = {

			authData: {
				cardID: ''
            },
            
            authenticatedMember: {
				data: {},
				isAuthenticated: false
            },
            
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


    //#Get data member yang sedang TOP UP
    componentDidUpdate(prevProps){

        const { storeState } = this.props;
        const { isModalOpen } = this.state;

        // console.log(storeState.userData)

        if(prevProps.storeState.userData !== storeState.userData){
            if(storeState.isAuthenticated){
                // console.log(storeState);
                this.setState({
                    ...this.state,
                    authenticatedMember: {
                        data : storeState.userData.member,
                        isAuthenticated : storeState.userData.accessToken ? true : false
                    }
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
        console.log(this.state);
        
    }
    toggleDialog = (data) => {
		const { dialog, showDialogDispatch, hideDialogDispatch } = this.props;

		if(!dialog.isOpened) {
            // this.showDialog(data);
            showDialogDispatch(data)
		}
		else {
            // this.hideDialog();
            hideDialogDispatch();
		}
	}

    showDialog = () => {
        /*Only Declare */
    }

    hideDialog = () => {
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
            hideDialog
        } = this.state;
        
        // console.log(this.state);
        // console.log(this.props);

		const { dispatch, accessToken } = this.props;        

		// let requiredData = {
		// 	balance: parseInt(topupData.balance.replace(/,/g, '')),
		// 	payment: topupData.payment
		// }

		// let paymentMethodName;

		// paymentMethod.forEach((method) => {
		// 	if(method.id == topupData.payment) {
		// 		return paymentMethodName = method.name;
		// 	}
		// })

		let dialogData = {
			type: 'confirm',
			title: 'Perhatian!',
			message: (
				<p>
					Konfirmasi terlebih dahulu informasi berikut sebelum melanjutkan.<br/>
					Jumlah saldo yang akan diisi adalah
					{/* <span className="fw-semibold clr-primary">{' '}<Currency value={requiredData.balance} />{' '}</span>
					dengan metode pembayaran <span className="fw-semibold">{paymentMethodName}</span>.<br/> */}
					
				</p>
			),
			onConfirm: () => {
				// dispatch(memberTopup(requiredData, authenticatedMember.accessToken))
			},
			confirmText: 'Selesai',
			onClose: () => hideDialog(),
			closeText: 'Batal'
		}

        this.toggleDialog(dialogData);
        // this.toggleModal('paymentConfirmation');

        // this.setState({
        //     ...this.state,
        //     isModalOpen: {
		// 		topup: false
        //     }
        // })
	}

    render() {
        
        return ( 
        
            // <StoreCashierTopUpView {...this.state} {...this.props} 
            //     handleInputChange = {this.handleInputChange}
            //     handleAuthentication = { this.handleAuthentication}
            //     toggleModal={this.toggleModal}
            // />

            
            <CashierTopUp
                {...this.state}
                {...this.props}
                toggleModal={this.toggleModal}
                handleInputChange={this.handleInputChange}
                handleAuthentication = { this.handleAuthentication}

                handleTopupSubmit={this.handleTopupSubmit}
                toggleDialog={this.toggleDialog}
				showDialog={this.showDialog}
				hideDialog={this.hideDialog}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreCashierTopUp);