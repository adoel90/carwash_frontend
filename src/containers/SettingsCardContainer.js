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
	toggleDialog
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

	componentDidUpdate = (prevProps) => {
		const {
			card,
			dispatch,
			dialog
		} = this.props;


		if(prevProps.card !== this.props.card) {
			let dialogData = {
				success: {
					type: 'success',
					title: '',
					message: '',
					close: () => {
						window.location.reload()
					},
					closeText: 'Tutup'
				}
			}


			if(card.isUpdated) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Data tipe kartu berhasil diubah.';

				dispatch(toggleDialog(dialogData.success, dialog.isOpen));
			}

			else if(card.isCreated) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Tipe kartu telah berhasil dibuat.';

				dispatch(toggleDialog(dialogData.success, dialog.isOpen));
			}

			else if(card.isDeleted) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Tipe kartu telah berhasil dihapus.';

				dispatch(toggleDialog(dialogData.success, false));
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
			minimum: selectedCardType.minimum,
			bonus: selectedCardType.bonus
		}

		dispatch(updateCardType(requiredData, accessToken));
	}

	handleCardTypeDelete = (cardType) => {
		const {
			dispatch,
			dialog
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
			message: `Anda akan menghapus tipe kartu ${cardType.name}. \n Aksi ini tidak dapat dipulihkan kembali. \n Apakah Anda yakin ingin melanjutkan?`,
			confirm: (e) => this.handleCardTypeDeleteSubmit(e),
			confirmText: 'Ya, Lanjutkan',
			cancel: true,
			cancelText: 'Batalkan'
		}

		dispatch(toggleDialog(dialogData, dialog.isOpen));
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
