import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ModalDialog } from '../../../components/Modal';

import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { authenticateMember, updateMember } from '../../../actions/member.action';
import { AdminStoreCashierKartuBaruWrapper } from '../AdminStoreCashierKartuBaru';


function mapStateToProps (state){
    return {
        member: state.member,
        dialog: state.dialog
    }
}

function mapDispatchToProps(dispatch){
    return {
        authenticateMemberDispatch: (data) => dispatch(authenticateMember(data)),
        action: bindActionCreators({ updateMember, openDialog, closeDialog  }, dispatch)
    }
}

class AdminStoreCashierKartuBaru extends Component {

    constructor(){  
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeInModalUpdate = this.handleInputChangeInModalUpdate.bind(this);
        this.handleAuthenticateMember = this.handleAuthenticateMember.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleToggleUpdate= this.handleToggleUpdate.bind(this);
        this.handleUpdateCreateMember = this.handleUpdateCreateMember.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.state = {
            authData: {
				cardID: ''
            },
            isModalOpen:{
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
            selectedMember: {},
            typeNumberMember: {}
        }
    }

    componentDidUpdate(prevProps){

        const { member } = this.props;
        const { toggleModal } = this.state;

        if(prevProps.member.item !== member.item){
            // console.log(member);
            if(member.item.isAuthenticated) {
                
                //#
                this.state.selectedMember = member.item.data;

                //#
                this.setState({
                    ...this.state,
                    typeNumberMember: member.item.data ? member.item.data.card.type.id : null
                });
                
                this.forceUpdate();
                this.handleToggleUpdate();
            }
        }

        if(prevProps.member.item !== member.item){
            if(member.item.isUpdated){

            }
        }
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

        if(!dialog.isOpened) {
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
 
        if(object) {
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

        console.log(this.state);
        

        // e.preventDefault();
        const {isModalOpen} = this.state;

        this.setState({
            ...this.state,
            isModalOpen:{
                updateMemberNewCardConfirmation:false
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

        // console.log(value);

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

        let requiredData = {
              id : selectedMember.id,
              name : selectedMember.name,
              email: newCardData.email,
              phone: newCardData.phone,
              address: newCardData.address
            //   category : selectedStore.type.id ? parseInt(selectedStore.type.id) : parseInt(selectedStore.type)
        };

        console.log(requiredData);


        action.updateMember(requiredData).then(() => {
              const { member  } = this.props;

              member.item.isUpdated
              if (member.item.isUpdated) {
                    let dialogData = {
                          type: 'success',
                          title: 'Berhasil',
                          message: 'Member telah berhasil di simpan. Klik tombol berikut untuk kembali.',
                          onClose: () => window.location.reload(),
                          closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
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


    render() {
        return (
          
            <div>
                <AdminStoreCashierKartuBaruWrapper 
                    handleInputChange = {this.handleInputChange}
                    handleInputChangeInModalUpdate = {this.handleInputChangeInModalUpdate}
                    handleAuthenticateMember = { this.handleAuthenticateMember}
                    toggleModal={this.toggleModal}
                    handleToggleUpdate = {this.handleToggleUpdate}
                    handleUpdateCreateMember = { this.handleUpdateCreateMember}
                    handleCancelModal = { this.handleCancelModal}
                    {...this.state} {...this.props} 
                
                />
                {this.renderDialog()}
            </div>
        ) 
    }
}

// export default AdminStoreCashierKartuBaru;
export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierKartuBaru);