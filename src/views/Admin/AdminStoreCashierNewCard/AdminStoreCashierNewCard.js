import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { StoreCashierNewCardView } from '../StoreCashierNewCard';
import  {CashierNewCard}  from '../../../components/Cashier';
import { Dialog } from '../../../components/Dialog';
import { createNewMember } from '../../../actions/member.action';
import { getAllCardType } from '../../../actions/card.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

function mapStateToProps(state) {
    return {
		member: state.member,
		card: state.card,
		dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
		createNewMemberdDispatch : (data) => dispatch(createNewMember(data)),
		getAllCardTypeDispatch: (accessToken) => dispatch(getAllCardType(accessToken)),
		openDialogDispatch: (data) => dispatch(openDialog(data)),
		closeDialogDispatch: (data) => dispatch(closeDialog(data))

    }
}

class AdminStoreCashierNewCard extends Component {

	constructor(){
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handleChangeCardType = this.handleChangeCardType.bind(this);
		this.getAllCardType = this.getAllCardType.bind(this);
		this.handleNewCardSubmit = this.handleNewCardSubmit.bind(this);
		this.handleNewCardConfirmation = this.handleNewCardConfirmation.bind(this);
		this.handleNewCardConfirmationSubmit = this.handleNewCardConfirmationSubmit.bind(this);
		this.renderDialog = this.renderDialog.bind(this);

		this.state = {

			cardTypes: [],

			newCardData: {
				card: 1,
				payment: 1,
				name: '',
				phone: '',
				email: '',
				address: '',
				tipecard: null
			},
			selectedCardType: {
				id: '',
				min: ''
			},
			paymentMethod: [
				{ id: 1, name: 'Cash' },
				{ id: 2, name: 'Debit' },
				{ id: 3, name: 'Credit' },
			],
			isModalOpen: {
				newCardConfirmation: false,
				newCardInstruction: false
			},
			dataMember: {
				isCreated:false
			}
		}
	}

	componentDidMount(){
		const { getAllCardTypeDispatch } = this.props;
		const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
		getAllCardTypeDispatch(accessToken);
	}

	componentDidUpdate(prevProps){

		const { newCardData, newMember } = this.state;
		const { card, member } = this.props;

		if(prevProps.card.types !== card.types){
			if(card.types.isLoaded){
				this.setState({
					newCardData: {
						...this.state.newCardData,
						card: card.types.data.data.result[2]
					},
					cardTypes: card.types.data,
					selectedCardType: {
						id: card.types.data.data.result[2].id,
						min: card.types.data.data.result[2].min,
						refund: card.types.data.data.result[2].refund
					}

				}, ()=> {
					console.log(this.state);
					
				})
			}
		}

		if(prevProps.member !== member){
			this.setState({
				dataMember:{
					...this.state.dataMember,
					isCreated: member.memberCreated.isCreated
				}
			}, () => {
				console.log(this.state);				
			})
		}
	}

	handleChangeCardType = (e) => {
		e.preventDefault();
		const { cardTypes, newCardData } = this.state;
		this.handleInputChange(newCardData, e);

		const target = e.target;
		const name = target.name;
		const value = target.value;
	
		// console.log(value);
		// console.log(cardTypes);

		cardTypes.data.result.forEach((item) => {
			// console.log(item);
			if(item.id === parseInt(value)) {
				this.setState({
					...this.state,
					newCardData: {
						...this.state.newCardData,
						card: item.id,
						tipecard: item.name
					},
					selectedCardType: {
						id: item.id,
						min: item.min,
						refund: item.refund
					}
				}, () => {
					// console.log(this.state);
					
				})
			}
		})
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
		
		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
	}

	getAllCardType = () => {
		/*Only declare */
	}

	//#
	handleNewCardSubmit = (e) => {
		e.preventDefault();		
		this.handleNewCardConfirmation();
	}

	handleNewCardConfirmation = () => {
		this.toggleModal('newCardConfirmation')
	}

	//#
	handleNewCardConfirmationSubmit = (e) => {
		const {
			newCardData,
			selectedCardType
		} = this.state;

		const {
			dispatch,
			accessToken,
			createNewMemberdDispatch
		} = this.props;
		
		e.preventDefault();

		let requiredData = {
			card: newCardData.card,
			payment: newCardData.payment,
			name: newCardData.name,
			phone: newCardData.phone,
			email: newCardData.email,
			address: newCardData.address
		}
		console.log(newCardData);
		console.log(requiredData);
		
		createNewMemberdDispatch(requiredData).then(()=> {
			
			const { member } = this.props;
			const { dataMember } = this.state;

			// if(member.memberCreated.isCreated){
			if(dataMember.isCreated){
				let dialogData = {
					type: 'success',
					title: 'Berhasil Membuat Kartu',
					message: 'Kartu member telah berhasil di buat. Klik tombol berikut untuk kembali.',
					onClose: () => window.location.reload(),
					closeText: 'Kembali'
				}
				//#
				this.toggleDialog(dialogData)
			}

			if (member.memberCreated.isError) {
				
				let dialogData = {
					type: 'danger',
					title: 'Gagal',
					message: 'Kartu gagal di buat. Klik tombol berikut untuk kembali.',
					onClose: () => this.toggleDialog(),
					closeText: 'Kembali'
				}
		
				this.toggleDialog(dialogData);
			}
		
		});
	}

	toggleDialog = (data) => {
		
		const { dialog, action, openDialogDispatch, closeDialogDispatch } = this.props;
		
		if(!dialog.isOpened) {
			openDialogDispatch(data);
        } else {
			closeDialogDispatch(data);
        }
    }

	openDialog = () => {
		/* Only Declare */
	}

	closeDialog = () => {
		/* Only Declare */
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
				<CashierNewCard
					{...this.props}
					{...this.state}
					toggleModal={this.toggleModal}
					handleInputChange={this.handleInputChange}
					handleChangeCardType={this.handleChangeCardType}
					handleNewCardSubmit={this.handleNewCardSubmit}
					handleNewCardConfirmationSubmit={this.handleNewCardConfirmationSubmit}
					toggleDialog={this.toggleDialog}
					openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
				/>
				{this.renderDialog()}
			</div>
		);
    }
}

// export default StoreCashierNewCard;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierNewCard);