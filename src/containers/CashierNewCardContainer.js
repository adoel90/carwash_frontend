import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	createNewMember
} from '../actions/member.action';
import {
	getAllCardType
} from '../actions/card.action';
import { CashierNewCard } from '../components/Cashier';

class CashierNewCardContainer extends Component {
	constructor() {
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChangeCardType = this.handleChangeCardType.bind(this);
		this.handleNewCardSubmit = this.handleNewCardSubmit.bind(this);
		this.handleNewCardInstructionSubmit = this.handleNewCardInstructionSubmit.bind(this);
		this.getCardTypes = this.getCardTypes.bind(this);

		this.state = {
			cardTypes: [],
			isModalOpen: {
				newCardInstruction: false
			},
			selectedCardType: {
				id: '',
				balance: ''
			},
			newCardData: {
				card: 1,
				name: '',
				phone: '',
				email: '',
				address: '',
			}
		}
	}

	componentDidMount = () => {
		this.getCardTypes();
	}

	componentDidUpdate = (prevProps) => {
		const { newCardData } = this.state;
		const {
			card,
			member
		} = this.props;

		if(prevProps.card.types !== card.types) {
			console.log(card.types);
			
			if(card.types.isLoaded) {
				this.setState({
					cardTypes: card.types.data,
					selectedCardType: {
						id: card.types.data[0].id,
						min: card.types.data[0].min
					}
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
		const {
			newCardData
		} = this.state;

		const {
			dispatch,
			accessToken
		} = this.props;

		e.preventDefault();

		let requiredData = {
			card: newCardData.card,
			name: newCardData.name,
			phone: newCardData.phone,
			email: newCardData.email,
			address: newCardData.address
		}

		dispatch(createNewMember(requiredData, accessToken));
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

		console.log(this.state);
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
					selectedCardType: {
						id: item.id,
						min: item.min
					}
				})
			}
		})
	}

	render() {
		return (
			<CashierNewCard
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleChangeCardType={this.handleChangeCardType}
				handleNewCardSubmit={this.handleNewCardSubmit}
				handleNewCardInstructionSubmit={this.handleNewCardInstructionSubmit}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog,
		member: state.member,
		card: state.card,
		// cardTypes: state.card.list.data
	}
}

export default connect(mapStateToProps)(CashierNewCardContainer);
