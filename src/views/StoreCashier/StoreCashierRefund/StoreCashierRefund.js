import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dialog } from '../../../components/Dialog';
import { StoreCashierRefundView } from '../StoreCashierRefund';
import { CashierRefund, CashierRefundFirst} from '../../../components/Cashier';
import { kasirTopUpLogin } from '../../../actions/store.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { memberRefund } from '../../../actions/member.action';
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
        kasirTopUpLoginDispatch: bindActionCreators(kasirTopUpLogin, dispatch),
        memberRefundDispatch: (data) => dispatch(memberRefund(data)),
        openDialogDispatch:(data) =>  dispatch(openDialog(data)),
        closeDialogDispatch: (data) => dispatch(closeDialog(data))
    }
}

class StoreCashierRefund extends Component {

    constructor(){
        super();
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRefundSubmit = this.handleRefundSubmit.bind(this);
        // this.memberRefund = this.memberRefund.bind(this)
        this.toggleDialog = this.toggleDialog.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.state = {
            selectedMemberRefund:{},
			authData: {
				cardID: ''
            },
            
            // authenticatedMember: {
			// 	data: {},
			// 	isAuthenticated: false
            // },

            isModalOpen: {
                refund: false,
                // topupConfirm: false
            },
            error: {
				data: {},
				isError: false
            },
        }
    }

    //#Get data member yang sedang REFUND 
    componentDidUpdate(prevProps){

        const { storeState } = this.props;
        const { isModalOpen } = this.state;

        if(prevProps.storeState.userData !== storeState.userData){
            if(storeState.isAuthenticated){

                // this.state.selectedMemberRefund = storeState.userData.member;
                this.state.selectedMemberRefund = storeState.userData;
                this.forceUpdate();
                this.handleTopUp();    
        
            }   
        }

 
    }	

    handleAuthentication = (e) => {

        e.preventDefault();
        const {kasirTopUpLoginDispatch } = this.props;
		const {authData } = this.state;
        
        let requireData = {
            cardID: authData.cardID
        }

        console.log(requireData);
        
    
        // this.toggleModal("topup");
        kasirTopUpLoginDispatch(requireData);
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

    toggleModal = (name) => {
        const { isModalOpen } = this.state;

        this.setState({
            isModalOpen: {
                ...isModalOpen,
                [name] : !isModalOpen[name]
            }
        })
    }
       
    handleTopUp = () => {
        this.toggleModal('refund');
        console.log("Hai hai ");
        
    }

    handleRefundSubmit = (e) => {
        e.preventDefault();

        const { selectedMemberRefund, toggleDialog } = this.state;
        
        const { dispatch, accessToken, memberRefundDispatch } = this.props;
        
        let requiredData = {
            card: selectedMemberRefund.member.card.id,
            accessToken: selectedMemberRefund.accessToken
        }

        memberRefundDispatch(requiredData).then(() => {

            const { member } = this.props;

            // console.log(member);

            if(member.item.isRefundeed){

                let dialogData = {
					type: 'success',
					title: 'Berhasil melakukan Refunding',
					message: 'Saldo telah berhasil di refund. Klik tombol berikut untuk kembali.',
					onClose: () => window.location.reload(),
					closeText: 'Kembali'
				}
                this.toggleDialog(dialogData)
            }

            if (member.item.isError) {
				let dialogData = {
					type: 'danger',
					title: 'Gagal',
					message: 'REFUNDING gagal di tambahkan. Silahkan panggil Administrator untuk maintenance.',
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
                <CashierRefundFirst 
                    {...this.state} 
                    {...this.props} 
                    handleInputChange={this.handleInputChange}
                    handleAuthentication= {this.handleAuthentication}
                    toggleModal = {this.toggleModal}
                    handleRefundSubmit = {this.handleRefundSubmit}
                />
                {this.renderDialog()}
            </div>
        )
        
       

    }
}

// export default StoreCashierRefund;
export default connect( mapStateToProps, mapDispatchToProps)(StoreCashierRefund);