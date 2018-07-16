import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ModalDialog } from '../../../components/Modal';

import { getNominalSaldoNewCustomer }  from '../../../actions/card.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { authenticateMember, updateMember } from '../../../actions/member.action';
import { AdminStoreCashierKartuBaruWrapper, AdminStoreCashierKartuBaruPaymentReceipt} from '../AdminStoreCashierKartuBaru';


function mapStateToProps(state) {
    return {
        member: state.member,
        dialog: state.dialog,
        card: state.card
    }
};

function mapDispatchToProps(dispatch) {
    return {
        authenticateMemberDispatch: (data) => dispatch(authenticateMember(data)),
        getNominalSaldoNewCustomerDispatch : (data) => dispatch(getNominalSaldoNewCustomer(data)),
        action: bindActionCreators({ updateMember, openDialog, closeDialog }, dispatch)
    }
};

class AdminStoreCashierKartuBaru extends Component {

    constructor() {
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeInModalUpdate = this.handleInputChangeInModalUpdate.bind(this);
        this.handleAuthenticateMember = this.handleAuthenticateMember.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleToggleUpdate = this.handleToggleUpdate.bind(this);
        this.handleUpdateCreateMember = this.handleUpdateCreateMember.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.handleNewCardPrintSubmit = this.handleNewCardPrintSubmit.bind(this);

        this.state = {
            authData: {
                cardID: ''
            },
            isModalOpen: {
                updateMemberNewCardConfirmation: false
            },
            newCardData: {
                // card: 1,
                payment: 1,
                // name: '',
                phone: '',
                email: null,
                address: ''
            },
            paymentMethod: [
                { id: 1, name: 'Cash' },
                { id: 2, name: 'Debit' },
                { id: 3, name: 'Credit' },
            ],
            printData: {},
            selectedMember: {},
            dataMemberAfterUpdate: {},
            typeNumberMember: {},
            listNominalNewCustomer: {}
        }
    };

    componentDidMount(){
       
    };

    componentDidUpdate(prevProps) {

        const { member, card} = this.props;
        const { toggleModal, typeNumberMember,selectedMember } = this.state;

        if (prevProps.member.item !== member.item) {
            if (member.item.isAuthenticated) {

                //#
                this.state.selectedMember = member.item.data;
                this.state.typeNumberMember = member.item.data.card ? member.item.data.card.type.id : null;
                console.log(this.state.selectedMember);
                
                //#
                // if (member.item.data) {
                // this.setState({
                //     ...this.state,
                //     typeNumberMember: member.item.data ? member.item.data.card.type.id : null
                // });
                // }

                this.forceUpdate();
                this.handleToggleUpdate();
            };

            //GET NOMINAL SALDO NEW CUSTOMER
            if(member.item.isAuthenticated){  
                const { getNominalSaldoNewCustomerDispatch } = this.props;

                let requiredData = {
                    limit : null
                };
        
                getNominalSaldoNewCustomerDispatch(requiredData);
            };
        };
        
        //GET NOMINAL SALDO NEW CUSTOMER
        if(prevProps.card.nominal !== card.nominal){
            if(card.nominal.isLoaded){
                
                this.setState({
                    ...this.state,
                    listNominalNewCustomer : card.nominal.data.result
                });
            }
        }
        

        if (prevProps.member.item !== member.item) {
            if (member.item.isUpdated) {
                
            }
        };
    };

    toggleModal = (name) => {
        const { isModalOpen } = this.state;

        this.setState({
            isModalOpen: {
                ...isModalOpen,
                [name]: !isModalOpen[name]
            }
        });
    }

    renderDialog = () => {
        const { dialog, toggleDialog } = this.props;

        return (
            <ModalDialog
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

    toggleDialog = (data) => {
        const { dialog, action } = this.props;

        if (!dialog.isOpened) {
            action.openDialog(data);
        } else {
            action.closeDialog();
        }
    }

    handleToggleUpdate = () => {
        this.toggleModal('updateMemberNewCardConfirmation');
    }

    //#
    handleInputChange = (object, e) => {

        const target = e.target;
        const value = target.value;
        const name = target.name;

        if (object) {
            object[name] = value;
            this.forceUpdate();
        } else {
            this.setState({
                [name]: value
            })
        }
    };

    //#
    handleCancelModal = () => {

        // e.preventDefault();
        const { isModalOpen } = this.state;

        this.setState({
            ...this.state,
            isModalOpen: {
                updateMemberNewCardConfirmation: false
            }
        });
    }

    handleAuthenticateMember = (e) => {
        e.preventDefault();
        const { authenticateMemberDispatch } = this.props;
        const { authData } = this.state;

        let firstData = authData.cardID.replace('%', "");
        let finalDataCardId = firstData.replace('?', "");

        let requiredData = { card: finalDataCardId }
        authenticateMemberDispatch(requiredData);
    }

    //#
    handleInputChangeInModalUpdate = (object, e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            ...this.state,
            [object]: {
                ...this.state[object],
                [name]: value
            }
        });
    };

    //#
    handleUpdateCreateMember = (e) => {
        e.preventDefault();
        const { action } = this.props;
        const { selectedMember, newCardData } = this.state;

        // console.log(selectedMember);
        // console.log(newCardData);

        let requiredData = {
            id: selectedMember.id,
            // id: selectedMember.card ? selectedMember.card.id : null,
            name: selectedMember.name,
            email: newCardData.email,
            phone: newCardData.phone,
            address: newCardData.address
            //   category : selectedStore.type.id ? parseInt(selectedStore.type.id) : parseInt(selectedStore.type)
        };

        console.log(requiredData);

        action.updateMember(requiredData).then(() => {
            const { member } = this.props;

            
            if (member.item.isUpdated) {
                let dialogData = {
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Member telah berhasil di simpan. Klik tombol berikut untuk kembali.',
                    onClose: () => window.location.reload(),
                    closeText: 'Kembali'
                };

                //Get this data to set in print
                this.setState({
                    ...this.state,
                    dataMemberAfterUpdate: {
                        name: selectedMember.name,
                        cardType:  selectedMember.card ? selectedMember.card.type.name : "-",
                        saldoNow: selectedMember.balance ? selectedMember.balance : "-",
                        bonus: selectedMember.card.type ? selectedMember.card.type.bonus : ""
                    }
                });
                
                this.toggleDialog(dialogData);
                this.handleNewCardPrintSubmit();

            } else if (member.item.isError) {
                let dialogData = {
                    type: 'danger',
                    title: 'Gagal',
                    message: 'Member gagal di simpan. Klik tombol berikut untuk kembali.',
                    onClose: () => this.toggleDialog(),
                    closeText: 'Kembali'
                }

                this.toggleDialog(dialogData);

            } else {
                alert("Hubungi Superadmin untuk memperbaiki !");
            }

            
        });
    }

    handleNewCardPrintSubmit = () => {
        // e.preventDefault();
        
		const { selectedMember } = this.state;

		this.setState({
			...this.state,
			statusPrintData: 200,
			printData: selectedMember
		}, () => {
			window.print();
		})
		
	}


    render() {
        return (

            <div>
                <AdminStoreCashierKartuBaruWrapper
                    handleInputChange={this.handleInputChange}
                    handleInputChangeInModalUpdate={this.handleInputChangeInModalUpdate}
                    handleAuthenticateMember={this.handleAuthenticateMember}
                    toggleModal={this.toggleModal}
                    handleToggleUpdate={this.handleToggleUpdate}
                    handleUpdateCreateMember={this.handleUpdateCreateMember}
                    handleCancelModal={this.handleCancelModal}
                    {...this.props}
                    {...this.state} 

                />
                <AdminStoreCashierKartuBaruPaymentReceipt {...this.props} {...this.state} /> 
                {this.renderDialog()}
               
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierKartuBaru);