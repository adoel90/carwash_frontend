import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateMember, memberRefund } from '../../../actions/member.action';
import {
	openDialog,
	closeDialog
} from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';
import { ModalDialog } from '../../../components/Modal';
// import { CashierRefund } from '../../../components/Cashier';
import { CashierRefund } from '../AdminStoreCashierRefund';

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
            }
        }
    }

    componentDidUpdate = (prevProps) => {
        const {
            member,
            toggleDialog
        } = this.props;

        if(prevProps.member.item !== member.item) {
            if(member.item.isAuthenticated) {
                this.state.selectedMember = member.item.data;
                this.forceUpdate();

                this.handleRefund();
            }

            if(member.item.isRefunded) {
            	let dialogData = {
            		type: 'success',
            		title: 'Berhasil!',
            		message: 'Proses refund berhasil. Klik tombol berikut untuk kembali.',
            		onClose: () => window.location.reload(),
            		closeText: 'Kembali'
            	}

            	this.toggleDialog(dialogData);
            }
        }
    }

    toggleDialog = (data) => {
		const {
			dialog
        } = this.props;

		if(!dialog.isOpened) {
			this.openDialog(data);
		}
		else {
			this.closeDialog();
		}
	}

	openDialog = (data) => {
		const {
			dispatch
		} = this.props;

		dispatch(openDialog(data));
	}

	closeDialog = () => {
		const {
			dispatch
		} = this.props;

		dispatch(closeDialog());
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
    }

    handleAuthenticateMember = (e) => {
        e.preventDefault();
        
        const {
            refund
        } = this.state;

        const {
            dispatch,
            accessToken,
            member
        } = this.props;

        let requiredData = {
            card: refund.cardID
        }
        
        dispatch(authenticateMember(requiredData, accessToken));
    }
    
    handleRefund = () => {
        this.toggleModal('refundConfirmation');
    }

    handleRefundSubmit = (e) => {
        e.preventDefault();

        const {
            selectedMember
        } = this.state;
        
        const {
            dispatch,
            member,
            accessToken
        } = this.props;
        
        let requiredData = {
            card: selectedMember.card.id,
            accessToken: member.item.accessToken
        }

        dispatch(memberRefund(requiredData));
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
                {this.renderDialog()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        member: state.member,
        dialog: state.dialog
    }
}

export default connect(mapStateToProps)(AdminStoreCashierRefund);