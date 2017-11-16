import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getAllCardType,
	getCardTypeList
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
				newCardType: false
			},
			newCardType: {
				name: '',
				minimum: '',
				bonus: ''
			}
		}
	}

	componentDidMount = () => {
		this.getAllCardType();
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

	handleNewCardType = () => {
		this.toggleModal('newCardType');
	}

	handleCardTypeUpdate = () => {
	}

	handleCardTypeDelete = () => {
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
				handleCardTypeUpdate={this.handleCardTypeUpdate}
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
