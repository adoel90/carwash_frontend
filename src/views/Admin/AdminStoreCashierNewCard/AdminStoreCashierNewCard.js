import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { StoreCashierNewCardView } from '../StoreCashierNewCard';
import  {CashierNewCard}  from '../../../components/Cashier';
import { Dialog } from '../../../components/Dialog';
import { createNewMember } from '../../../actions/member.action';
import { getAllCardType } from '../../../actions/card.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

class AdminStoreCashierNewCard extends Component {
	constructor() {
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChangeCardType = this.handleChangeCardType.bind(this);
		this.handleNewCardSubmit = this.handleNewCardSubmit.bind(this);
		this.handleNewCardConfirmation = this.handleNewCardConfirmation.bind(this);
		this.handleNewCardInstruction = this.handleNewCardInstruction.bind(this);
		this.handleNewCardInstructionSubmit = this.handleNewCardInstructionSubmit.bind(this);
		this.getCardTypes = this.getCardTypes.bind(this);

		this.state = {
			cardTypes: [],
			isModalOpen: {
				newCardConfirmation: false,
				newCardInstruction: false
			},
			selectedCardType: {
				id: '',
				min: ''
			},
			newMember: {
				data: {},
				isCreated: false
			},
			newCardData: {
				card: 1,
				payment: 1,
				name: '',
				phone: '',
				email: '',
				address: '',
			},
			paymentMethod: [
				{ id: 1, name: 'Cash' },
				{ id: 2, name: 'Debit' },
				{ id: 3, name: 'Credit' },
			]
		}
	}

	componentDidMount(){
		this.getCardTypes();
	}

	componentDidUpdate(prevProps){
		const { 
			newCardData,
			newMember
		} = this.state;

		const {
			card,
			member
		} = this.props;

		if(prevProps.card.types !== card.types) {
			if(card.types.isLoaded) {
				this.setState({
					newCardData: {
						...this.state.newCardData,
						card: card.types.data.data.result[0].id
					},
					cardTypes: card.types.data.data.result,
					selectedCardType: {
						id: card.types.data.data.result[0].id,
						min: card.types.data.data.result[0].min,
						refund: card.types.data.data.result[0].refund
					}
				})
			}
		}

		if(prevProps.member.item !== member.item) {
			if(member.item.isCreated) {
				this.setState({
					newMember: member.item
				}, () => {
					this.forceUpdate();
					this.handleNewCardInstruction();
				})
			}
		}
	}

	getCardTypes = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllCardType());
	}

	handleNewCardSubmit = (e) => {
		e.preventDefault();
		
		this.handleNewCardConfirmation();
	}

	handleNewCardConfirmation = () => {
		this.toggleModal('newCardConfirmation')
	}

	handleNewCardConfirmationSubmit = (e) => {
		const {
			newCardData,
			selectedCardType
		} = this.state;

		const {
			dispatch,
			accessToken
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

		dispatch(createNewMember(requiredData));
		this.toggleModal('newCardModal');
	}

	handleNewCardInstruction = () => {
		this.toggleModal('newCardInstruction')
	}

	handleNewCardInstructionSubmit = () => {
		window.location.reload();
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

	handleChangeCardType = (e) => {
		const {
			cardTypes,
			newCardData
		} = this.state;
		
		this.handleInputChange(newCardData, e);

		let selectedId = e.target.value;
		cardTypes.forEach((item) => {
			if(item.id === parseInt(selectedId)) {
				this.setState({
					...this.state,
					newCardData: {
						...this.state.newCardData,
						card: item.id
					},
					selectedCardType: {
						id: item.id,
						min: item.min,
						refund: item.refund
					}
				})
			}
		})
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
					handleNewCardInstructionSubmit={this.handleNewCardInstructionSubmit}
				/>
			</div>
		);
    }
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog,
		member: state.member,
		card: state.card
	}
}

export default connect(mapStateToProps)(AdminStoreCashierNewCard);