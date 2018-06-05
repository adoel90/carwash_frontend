import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticateMember } from '../../../actions/member.action';
import { AdminStoreCashierKartuBaruWrapper } from '../AdminStoreCashierKartuBaru';


function mapStateToProps (state){
    return {
        member: state.member,
        dialog: state.dialog
    }
}

function mapDispatchToProps(dispatch){
    return {
        authenticateMemberDispatch: (data) => dispatch(authenticateMember(data))
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
            selectedMember: {}
        }
    }

    componentDidUpdate(prevProps){

        const { member } = this.props;
        const { toggleModal } = this.state;

        if(prevProps.member.item !== member.item){
            // console.log(member);
            if(member.item.isAuthenticated) {
                this.state.selectedMember = member.item.data;
                this.forceUpdate();
                this.handleToggleUpdate();
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
    handleCancelModal = (e) => {
        e.preventDefault();
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
        // const { action } = this.props;
        e.preventDefault();
        const { selectedMember, newCardData } = this.state;

        console.log(selectedMember.card.type.name);

        let requiredData = {
              id : selectedMember.id,
              name : selectedMember.name,
              email: newCardData.email,
              phone: newCardData.phone,
              address: newCardData.address
            //   category : selectedStore.type.id ? parseInt(selectedStore.type.id) : parseInt(selectedStore.type)
        };

        console.log(requiredData);


        // action.updateStore(requiredData).then(() => {
        //       const {
        //             store
        //       } = this.props;

        //       if (store.updateStore.isUpdated) {
        //             let dialogData = {
        //                   type: 'success',
        //                   title: 'Berhasil',
        //                   message: 'Store telah berhasil diubah. Klik tombol berikut untuk kembali.',
        //                   onClose: () => window.location.reload(),
        //                   closeText: 'Kembali'
        //             }
            
        //             this.toggleDialog(dialogData);
        //       }
  
        //       if (store.updateStore.isError) {
        //             let dialogData = {
        //                   type: 'danger',
        //                   title: 'Gagal',
        //                   message: 'Store gagal diubah. Klik tombol berikut untuk kembali.',
        //                   onClose: () => this.toggleDialog(),
        //                   closeText: 'Kembali'
        //             }
            
        //             this.toggleDialog(dialogData);
        //       }
        // });
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
            </div>
        ) 
    }
}

// export default AdminStoreCashierKartuBaru;
export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierKartuBaru);