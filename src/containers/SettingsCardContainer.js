import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getAllCardType,
	getCardTypeList,
	createNewCardType,
	updateCardType,
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

		this.state = {
			searchText: '',
			isModalOpen: {
				newCardType: false,
				updateCardType: false,
				deleteCardType: false
			},
			newCardType: {
				name: '',
				minimum: '',
				bonus: '',
				refunable: false
			},
			selectedCardType: {
				name: '',
				minimum: '',
				bonus: '',
				refunable: false
			}
		}
	}

	componentDidMount = () => {
		this.getAllCardType();
	}

	componentDidUpdate = (prevProps) => {
		const {
			card,
			dispatch,
			dialog,
			toggleDialog,
			showDialog
		} = this.props;


		if(prevProps.card !== this.props.card) {
			let dialogData = {
				success: {
					type: 'success',
					title: '',
					message: '',
					onClose: () => {
						window.location.reload()
					},
					closeText: 'Kembali'
				}
			}

			if(card.isUpdated) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Data tipe kartu berhasil diubah. Klik tombol berikut untuk kembali.';

				toggleDialog(dialogData.success);
			}

			else if(card.isCreated) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Tipe kartu telah berhasil dibuat. Klik tombol berikut untuk kembali.';

				toggleDialog(dialogData.success);

			}

			else if(card.isDeleted) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Tipe kartu telah berhasil dihapus. Klik tombol berikut untuk kembali.';

				showDialog(dialogData.success);
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
			minimum: parseInt(newCardType.minimum),
			bonus: parseInt(newCardType.bonus),
			refunable: newCardType.refunable
		}

		dispatch(createNewCardType(requiredData, accessToken));
	}

	handleCardTypeUpdate = (cardType) => {
		this.setState({
			selectedCardType: {
				id: cardType.id,
				name: cardType.name,
				minimum: cardType.min,
				bonus: cardType.bonus,
				refunable: cardType.refunable
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
			minimum: parseInt(selectedCardType.minimum),
			bonus: parseInt(selectedCardType.bonus),
			refunable: selectedCardType.refunable
		}

		dispatch(updateCardType(requiredData, accessToken));
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
