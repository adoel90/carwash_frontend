import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { StoreCashierNewCardView } from '../StoreCashierNewCard';
import  {CashierNewCard}  from '../../../components/Cashier';
import { createNewMember } from '../../../actions/member.action';
import { getAllCardType } from '../../../actions/card.action';

function mapStateToProps(state) {
    return {
		member: state.member,
		card: state.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
		createNewMemberdDispatch : (data) => dispatch(createNewMember(data)),
		getAllCardTypeDispatch: (accessToken) => dispatch(getAllCardType(accessToken))
    }
}

class StoreCashierNewCard extends Component {

	constructor(){
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handleChangeCardType = this.handleChangeCardType.bind(this);
		this.getAllCardType = this.getAllCardType.bind(this);
		this.handleNewCardSubmit = this.handleNewCardSubmit.bind(this);
		this.handleNewCardConfirmation = this.handleNewCardConfirmation.bind(this);
		this.handleNewCardConfirmationSubmit = this.handleNewCardConfirmationSubmit.bind(this);

		this.state = {

			cardTypes: [],

			newCardData: {
				card: 1,
				payment: 1,
				name: '',
				phone: '',
				email: '',
				address: '',
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
		}
	}

	componentDidMount(){
		const { getAllCardTypeDispatch } = this.props;
		const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
		getAllCardTypeDispatch(accessToken);
	}

	componentDidUpdate(prevProps){

		const { newCardData, newMember } = this.state;
		const { card } = this.props;

		if(prevProps.card.types !== card.types){
			if(card.types.isLoaded){
				// console.log(card.types.data.result[2])
				this.setState({
					newCardData: {
						...this.state.newCardData,
						card: card.types.data.result[2]
					},
					cardTypes: card.types.data,
					selectedCardType: {
						id: card.types.data.result[2].id,
						min: card.types.data.result[2].min,
						refund: card.types.data.result[2].refund
					}

				}, ()=> {
					console.log(this.state);
					
				})
			}
		}
	}

	handleChangeCardType = (e) => {

		const { cardTypes, newCardData } = this.state;
		this.handleInputChange(newCardData, e);

		const target = e.target;
		const name = target.name;
		const value = target.value;

		// console.log(newCardData);
		console.log(e);
		// console.log(value);
		
		
		
		// let selectedId = e.membertarget.value;
		// let selectedId = value;

		// cardTypes.forEach((item) => {
		// 	// console.log(item);

		// 	if(item.id === parseInt(selectedId)) {
		// 		this.setState({
		// 			...this.state,
		// 			newCardData: {
		// 				...this.state.newCardData,
		// 				card: item.id
		// 			},
		// 			selectedCardType: {
		// 				id: item.id,
		// 				min: item.min,
		// 				refund: item.refund
		// 			}
		// 		})
		// 	}
		// })
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

		console.log(value);
		
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

		console.log(e);
		
		
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

		// dispatch(createNewMember(requiredData, accessToken));
		// createNewMemberdDispatch(requiredData);

		// this.toggleModal('newCardModal');
	}

    render() {
        
        //return <StoreCashierNewCardView {...this.state} {...this.props} />

        return (
			<CashierNewCard
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleChangeCardType={this.handleChangeCardType}
				handleNewCardSubmit={this.handleNewCardSubmit}
				handleNewCardConfirmationSubmit={this.handleNewCardConfirmationSubmit}

			/>
		);
    }
}

// export default StoreCashierNewCard;
export default connect( mapStateToProps, mapDispatchToProps )(StoreCashierNewCard);