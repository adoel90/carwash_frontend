import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateMember, memberRefund } from '../../../actions/member.action';
import {openDialog, closeDialog } from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';
import { ModalDialog } from '../../../components/Modal';
import { CashierRefund, CashierRefundPaymentReceipt } from '../AdminStoreCashierRefund';

class AdminStoreCashierRefund extends Component {

    constructor(){

        super();
        this.toggleDialog = this.toggleDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthenticateMember = this.handleAuthenticateMember.bind(this);
        this.handleRefund = this.handleRefund.bind(this);
        this.handleRefundSubmit = this.handleRefundSubmit.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.state = {
            selectedMember: {},
            refund: {
                cardID: 0
            },
            isModalOpen: {
                refundConfirmation: false
            },
            statusPrintData: null,
            printData: {}
        }
    }

    componentDidUpdate = (prevProps) => {
        const {member, toggleDialog } = this.props;
        const { printData, statusPrintData } = this.state;

        if(prevProps.member.item !== member.item) {
            if(member.item.isAuthenticated) {
                this.state.selectedMember = member.item.data;
                this.forceUpdate();
                this.handleRefund();
            }
        }

        if(prevProps.member.memberRefund !== member.memberRefund){
            if(member.memberRefund.isRefunded) {
                //CODE PRINT SHOULD BE IN HERE
            	let dialogData = {
            		type: 'success',
            		title: 'Berhasil!',
            		message: 'Proses refund berhasil. Klik tombol berikut untuk kembali.',
            		onClose: () => window.location.reload(),
            		closeText: 'Kembali'
            	}

                this.toggleDialog(dialogData);

                this.setState({
                    ...this.state,
                    printData: member,
                    statusPrintData: 200
                }, () => {
                    const { printData } = this.state;
                    window.print();
                });
            }

            if(member.memberRefund.isError){
                // console.log(member.memberRefund);
                let dialogData = {
            		type: 'error',
            		title: 'Can not refund',
            		message: 'Maaf, kartu yang Anda gunakan tidak bisa di refund',
            		onClose: () => window.location.reload(),
            		closeText: 'Kembali'
            	}

                this.toggleDialog(dialogData);
            }
        }
    }

    toggleDialog = (data) => {
		const { dialog } = this.props;

		if(!dialog.isOpened) {
			this.openDialog(data);
		} else {
			this.closeDialog();
		}
	}

	openDialog = (data) => {
		const { action } = this.props;
        action.openDialog(data)
	}

	closeDialog = () => {
		const { action } = this.props;
        action.closeDialog();
    }
    
    renderDialog = () => {
		const {
			dialog,
			dispatch,
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

    handleInputChange = (object, e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [object]: {
                [name]: value
            }
        })
    };

    handleAuthenticateMember = (e) => {
        e.preventDefault();
        
        const { refund } = this.state;
        const { authenticateMemberDispatch } = this.props;

        const {
            dispatch,
            accessToken,
            member
        } = this.props;

        let firstData = refund.cardID.replace('%', "");
        let finalDataCardId = firstData.replace('?', "");

        // let requiredData = { card: refund.cardID };
        let requiredData = { card: finalDataCardId };
        authenticateMemberDispatch(requiredData);
    };
    
    handleRefund = () => {
        this.toggleModal('refundConfirmation');
    }

    handleRefundSubmit = (e) => {
        e.preventDefault();

        const { selectedMember } = this.state;
        const { dispatch,member, accessToken, user, memberRefundDispatch} = this.props;
        // accessToken: member.item.accessToken

        let requiredData = {
            card: selectedMember.card.id,
            staff: user.level.id === 1 ?  user.level.id + 292 : user.level.id
        };

        console.log(requiredData);
        memberRefundDispatch(requiredData);
        // dispatch(memberRefund(requiredData));
    }
    
    render() {
        return (
            <div>
                <CashierRefund
                    {...this.state}
                    {...this.props}
                    toggleModal={this.toggleModal}
                    handleInputChange={this.handleInputChange}
                    handleAuthenticateMember={this.handleAuthenticateMember}
                    handleRefundSubmit={this.handleRefundSubmit}
                />
                <CashierRefundPaymentReceipt {...this.props} {...this.state}/>
                
                {this.renderDialog()}
                
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return {
        memberRefundDispatch: (data) => dispatch(memberRefund(data)),
        authenticateMemberDispatch: (data) => dispatch(authenticateMember(data)),
        action: bindActionCreators({  openDialog, closeDialog }, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        member: state.member,
        dialog: state.dialog
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierRefund);