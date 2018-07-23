import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ModalDialog } from '../../../components/Modal';


import { getSaldoBonus } from '../../../actions/store.action';
import { getNominalSaldoNewCustomer }  from '../../../actions/card.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { authenticateMember, updateMember, getAllMemberList} from '../../../actions/member.action';
import { AdminStoreCashierKartuBaruWrapper, AdminStoreCashierKartuBaruPaymentReceipt} from '../AdminStoreCashierKartuBaru';


function mapStateToProps(state) {
    return {
        member: state.member,
        dialog: state.dialog,
        card: state.card,
        storeState: state.store
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getSaldoBonusDispatch : (data) => dispatch(getSaldoBonus(data)),
        authenticateMemberDispatch: (data) => dispatch(authenticateMember(data)),
        getNominalSaldoNewCustomerDispatch : (data) => dispatch(getNominalSaldoNewCustomer(data)),
        getAllMemberListDispatch : () => dispatch(getAllMemberList()),
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
        this.handleSaldoAwalMember = this.handleSaldoAwalMember.bind(this);
        this.handleSaldoAwalTaxiOnline = this.handleSaldoAwalTaxiOnline.bind(this);

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
                address: '',
                saldoawalnonmember:null
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
            listNominalNewCustomer: {},
            optionTopUpMember: {},
            optionTopUpMemberThemeButton: false,
            memberNominal: {},
            customerBonus:{},
            saldoawal: null,
            memberList: {}
        }
    };

    componentDidMount(){
        const { getAllMemberListDispatch } = this.props;

        getAllMemberListDispatch();
    };

    componentDidUpdate(prevProps) {

        const { member, card, storeState } = this.props;
        const { toggleModal, typeNumberMember,selectedMember, memberList } = this.state;

        //GET LIST MEMBER ACTIVE
        if(prevProps.member.list !== member.list) {

            this.setState({
                ...this.state,
                memberList: member.list.data.result
            }, () => {
                console.log(this.state.memberList);
            });
        };

        if (prevProps.member.item !== member.item) {

            //Validasi kalau member sudah di daftarkan
            if(member.item.data.card.id ){

            };
            if (member.item.isAuthenticated) {

                //#
                this.state.selectedMember = member.item.data;
                this.state.typeNumberMember = member.item.data.card ? member.item.data.card.type.id : null;
                console.log(member.item.data);

                //#
                this.forceUpdate();
                this.handleToggleUpdate();

                 //#GET SALDO BONUS
                 const { getSaldoBonusDispatch } = this.props;
                
                 let requiredData = {
                     type: this.state.typeNumberMember
                 };
         
                 getSaldoBonusDispatch(requiredData);
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
        };
        
        if (prevProps.member.item !== member.item) {
            if (member.item.isUpdated) {
                
            }
        };

        //#GET SALDO BONUS
        if(prevProps.storeState.saldo !== storeState.saldo){
            if(storeState.saldo.isLoaded){
                this.setState({
                    ...this.state,
                    optionTopUpMember: storeState.saldo.data.result
                });
            };
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
        const { selectedMember, newCardData, memberNominal, saldoawal, customerBonus } = this.state;

        console.log(selectedMember);

        if(selectedMember.card.type.name === "Member"){ // JENIS CUSTOMER :  MEMBER 

            if(!isNaN(parseInt(memberNominal))){

                this.setState({
                    ...this.state,
                    saldoawal: parseInt(memberNominal)
                }, () => {
                    let requiredData = {
                        id: selectedMember.id,
                        balance:parseInt(this.state.saldoawal) + customerBonus,
                        name: selectedMember.name,
                        email: newCardData.email,
                        phone: newCardData.phone,
                        address: newCardData.address
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
                        };      
                    });
                });
            } else {
                alert("Anda belum isi Jumlah Top Up !");
            }
        } else if(selectedMember.card.type.name === "Non-Member"){ // JENIS CUSTOMER : NON-MEMBER

            const {customerBonus } = this.state;

            this.setState({
                ...this.state,
                saldoawal: newCardData.saldoawalnonmember,
     
            }, () => {
                let requiredData = {
                    id: selectedMember.id,
                    balance:typeof customerBonus === "object" ? parseInt(this.state.saldoawal) : parseInt(this.state.saldoawal) + customerBonus,
                    // balance: parseInt(this.state.saldoawal),
                    name: selectedMember.name,
                    email: newCardData.email,
                    phone: newCardData.phone,
                    address: newCardData.address
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
                        
                    };      
                });
            });
        } else { // JENIS CUSTOMER : TAXI ONLINE 
            this.setState({
                ...this.state,
                saldoawal: memberNominal
            },() => {

                const {customerBonus } = this.state;

                let requiredData = {
                    id: selectedMember.id,
                    balance:parseInt(this.state.saldoawal) + customerBonus,
                    name: selectedMember.name,
                    email: newCardData.email,
                    phone: newCardData.phone,
                    address: newCardData.address
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
                        window.location.reload();
                    };      
                });
            })
        }
    };

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
		
    };
    
    //#
    handleSaldoAwalMember = (saldoawal) => {

        this.setState({
            ...this.state,
            memberNominal: saldoawal.balance,
            customerBonus: parseInt(saldoawal.bonus),
            optionTopUpMemberThemeButton: true
        });
    };

    //#
    handleSaldoAwalTaxiOnline = (saldoawaltaxionline) => {

        this.setState({
            ...this.state,
            // : parseInt(saldoawaltaxionline.balance),
            memberNominal: parseInt(saldoawaltaxionline.balance),
            customerBonus: parseInt(saldoawaltaxionline.bonus),
            optionTopUpMemberThemeButton: true
        });
    };


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
                    handleSaldoAwalMember={this.handleSaldoAwalMember}
                    handleSaldoAwalTaxiOnline = {this.handleSaldoAwalTaxiOnline}
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