import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	createNewMember
} from '../actions/member.action';
import { CashierNewCard } from '../components/Cashier';

class CashierNewCardContainer extends Component {
	constructor() {
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleNewCardSubmit = this.handleNewCardSubmit.bind(this);
		this.handleNewCardInstructionSubmit = this.handleNewCardInstructionSubmit.bind(this);

		this.state = {
			isModalOpen: {
				newCardInstruction: false
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

	componentDidUpdate = (prevProps) => {
		const {
			member
		} = this.props;

		if(prevProps.member !== this.props.member) {
			if(member.isCreated) {
				this.toggleModal('newCardInstruction');
			}
		}
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

	render() {
		return (
			<CashierNewCard
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleNewCardSubmit={this.handleNewCardSubmit}
				handleNewCardInstructionSubmit={this.handleNewCardInstructionSubmit}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog,
		member: state.member
	}
}

export default connect(mapStateToProps)(CashierNewCardContainer);