import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getAllCardType,
	getCardTypeList,
	createNewCardType	
} from '../actions/card.action';
import { SettingsCard } from '../components/Settings';

class SettingsCardContainer extends Component {
	constructor() {
		super();
		this.getAllCardType = this.getAllCardType.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleNewCardType = this.handleNewCardType.bind(this);
		this.handleNewCardTypeSubmit = this.handleNewCardTypeSubmit.bind(this);
		this.handleCardTypeUpdate = this.handleCardTypeUpdate.bind(this);
		this.handleCardTypeDelete = this.handleCardTypeDelete.bind(this);

		this.state = {
			isModalOpen: {
				newCardType: false,
				updateCardType: false,
				deleteCardType: false
			},
			newCardType: {
				name: '',
				minimum: '',
				bonus: ''
			},
			selectedCardType: {
				name: '',
				minimum: '',
				bonus: ''
			}
		}
	}

	componentDidMount = () => {
		this.getAllCardType();
	}

	componentDidUpdate = () => {

		console.log(this.state);
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

	handleNewCardType = (e) => {
		this.toggleModal('newCardType');
	}

	handleNewCardTypeSubmit = (e) => {
		e.preventDefault();

		const {
			accessToken,
			dispatch
		} = this.props;

		const {
			newCardType
		} = this.state;

		const requiredData = {
			name: newCardType.name,
			minimum: newCardType.minimum,
			bonus: newCardType.bonus
		}

		dispatch(createNewCardType(requiredData, accessToken));
	}

	handleCardTypeUpdate = (cardType) => {
		this.setState({
			selectedCardType: {
				id: cardType.id,
				name: cardType.name,
				minimum: cardType.min,
				bonus: cardType.bonus
			}
		})

		this.toggleModal('updateCardType');
	}

	handleCardTypeDelete = () => {
		this.toggleModal('deleteCardType');
	}

	getAllCardType = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllCardType(accessToken));
	}

	render() {
		return (
			<SettingsCard
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleNewCardType={this.handleNewCardType}
				handleNewCardTypeSubmit={this.handleNewCardTypeSubmit}
				handleCardTypeUpdate={this.handleCardTypeUpdate}
				handleCardTypeUpdateSubmit={this.handleCardTypeUpdateSubmit}
				handleCardTypeDelete={this.handleCardTypeDelete}
			/>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		card: state.card,
		cardList: state.card.list.data,
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(SettingsCardContainer);
