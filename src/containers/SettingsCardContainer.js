import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getAllCardType,
	getCardTypeList,
	createNewCardType,
	updateCardType,
	changeCardTypeStatus,
	deleteCardType
} from '../actions/card.action';
import {
	showDialog,
	hideDialog
} from '../actions/dialog.action';
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
		this.handleCardTypeDeleteSubmit = this.handleCardTypeDeleteSubmit.bind(this);
		this.handleChangeCardTypeStatus = this.handleChangeCardTypeStatus.bind(this);

		this.state = {
			cardTypes: [],
			search: {
				searchText: '',
				searchBy: 'name'
			},
			isModalOpen: {
				newCardType: false,
				updateCardType: false,
				deleteCardType: false
			},
			newCardType: {
				name: '',
				minimum: '',
				bonus: '',
				refundable: false
			},
			selectedCardType: {
				name: '',
				minimum: '',
				bonus: '',
				refundable: false
			}
		}
	}

	componentDidMount = () => {
		this.getAllCardType();
	}

	componentDidUpdate = (prevProps) => {
		const {
			cardTypes
		} = this.state;

		const {
			card,
			dispatch,
			dialog,
			toggleDialog,
			showDialog
		} = this.props;

		let dialogData = {};

		if(prevProps.card.types !== card.types) {
			if(card.types.isLoaded) {
				this.setState({
					cardTypes: card.types.data
				})
			}
		}

		// if(prevProps.card.created !== card.created) {
		// 	if(card.created.isCreated) {
		// 		dialogData = {
		// 			type: 'success',
		// 			title: 'Berhasil',
		// 			message: 'Tipe kartu telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
		// 			onClose: () => {
		// 				window.location.reload()
		// 			},
		// 			closeText: 'Kembali'
		// 		}

		// 		toggleDialog(dialogData);
		// 	}
		// }

		if(prevProps.card.type !== card.type) {
			if(card.type.isCreated) {
				dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Tipe kartu telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
					onClose: () => {
						window.location.reload()
					},
					closeText: 'Kembali'
				}

				toggleDialog(dialogData);
			}

			if(card.type.isUpdated) {
				dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Informasi tipe kartu telah berhasil diubah. Klik tombol berikut untuk kembali.',
					onClose: () => {
						window.location.reload()
					},
					closeText: 'Kembali'
				}

				toggleDialog(dialogData);
			}

			else if(card.type.isStatusChanging) {
				cardTypes.forEach((item) => {
					if(item.id === card.type.id) {
						item.statusChanging = true;
						this.forceUpdate();
					}
				})
			}

			else if(card.type.isStatusChanged) {
				cardTypes.forEach((item) => {
					if(item.id === card.type.id) {
						item.statusChanging = false;

						if(item.status) {
							item.status = false;
						}
						else {
							item.status = true;
						}

						this.forceUpdate();
					}
				})
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

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

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
			minimum: parseInt(newCardType.minimum.replace(/,/g, '')),
			bonus: parseInt(newCardType.bonus.replace(/,/g, '')),
			refund: newCardType.refunable
		}
		
		dispatch(createNewCardType(requiredData, accessToken));
	}

	handleCardTypeUpdate = (cardType, e) => {
		this.setState({
			selectedCardType: {
				id: cardType.id,
				name: cardType.name,
				minimum: cardType.min,
				bonus: cardType.bonus,
				refundable: cardType.refund
			}
		})

		this.toggleModal('updateCardType');
	}

	handleCardTypeUpdateSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken,
			dialog,
			card
		} = this.props;

		const {
			selectedCardType
		} = this.state;

		let requiredData = {
			id: selectedCardType.id,
			name: selectedCardType.name,
			minimum: parseInt(selectedCardType.minimum.replace(/,/g, '')),
			bonus: parseInt(selectedCardType.bonus.replace(/,/g, '')),
			refund: selectedCardType.refundable
		}
		
		dispatch(updateCardType(requiredData, accessToken));
	}

	handleChangeCardTypeStatus = (cardType) => {
		const { selectedCardType } = this.state;
		const {
			accessToken,
			dispatch
		} = this.props;

		// this.setState({
		// 	selectedCardType: {
		// 		id: cardType.id,
		// 		name: cardType.name,
		// 		minimum: cardType.min,
		// 		bonus: cardType.bonus,
		// 		status: cardType.status
		// 	}
		// })

		let requiredData = {
			id: cardType.id
		}

		dispatch(changeCardTypeStatus(requiredData, accessToken));
	}

	handleCardTypeDelete = (cardType) => {
		const {
			dispatch,
			dialog,
			toggleDialog
		} = this.props;

		this.setState({
			selectedCardType: {
				id: cardType.id,
				name: cardType.name,
				minimum: cardType.min,
				bonus: cardType.bonus
			}
		})

		const dialogData = {
			type: 'confirm',
			title: 'Perhatian!',
			message: `Anda akan menghapus tipe kartu ${cardType.name}. Aksi ini tidak dapat dipulihkan kembali. \n Apakah Anda yakin ingin melanjutkan?`,
			onConfirm: (e) => this.handleCardTypeDeleteSubmit(e),
			confirmText: 'Ya, Lanjutkan',
			onClose: toggleDialog,
			closeText: 'Kembali'
		}

		toggleDialog(dialogData);
		// dispatch(toggleDialog(dialogData, dialog.isOpen));
	}

	handleCardTypeDeleteSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken,
			card
		} = this.props;

		const {
			selectedCardType
		} = this.state;

		let requiredData = {
			id: selectedCardType.id
		}

		dispatch(deleteCardType(requiredData, accessToken));
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
				handleChangeCardTypeStatus={this.handleChangeCardTypeStatus}
				handleCardTypeDelete={this.handleCardTypeDelete}
			/>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		card: state.card,
		// cardList: state.card.list.data,
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(SettingsCardContainer);
