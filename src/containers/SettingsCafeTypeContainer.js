import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getAllCafeMenu,
	getCafeMenuList,
	createCafeMenu,
	updateCafeMenu,
	deleteCafeMenu
} from '../actions/cafe.action';
import {
	toggleDialog
} from '../actions/dialog.action';
import { SettingsCafeType } from '../components/Settings';

class SettingsCafeTypeContainer extends Component {
	constructor() {
		super();
		this.getAllCafeMenu = this.getAllCafeMenu.bind(this);
		this.handleCafeMenuCreate = this.handleCafeMenuCreate.bind(this);
		this.handleCafeMenuUpdate = this.handleCafeMenuUpdate.bind(this)
		this.handleCafeMenuDelete = this.handleCafeMenuDelete.bind(this);
		this.handleCafeMenuDeleteSubmit = this.handleCafeMenuDeleteSubmit.bind(this);

		this.state = {
			selectedCafeMenu: {
				cafe: '',
				id: '',
				name: '',
				price: '',
				description: ''
			},
			cafeMenuCreate: {
				name: '',
				price: '',
				description: '',
				image: '',
				imagePreview: ''
			},
		}
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
	}

	componentDidUpdate = (prevProps) => {
		const {
			cafe,
			dispatch,
			dialog
		} = this.props;

		if(prevProps.cafe !== this.props.cafe) {
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

			if(cafe.isUpdated) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Perubahan terhadap menu cafe berhasil. Klik tombol berikut untuk kembali.';

				dispatch(toggleDialog(dialogData.success, dialog.isOpen));
			}

			if(cafe.isDeleted) {
				dialogData.success.title = 'Berhasil!';
				dialogData.success.message = 'Penghapusan menu cafe berhasil. Klik tombol berikut untuk kembali.';

				dispatch(toggleDialog(dialogData.success, false));
			}
		}
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
	}

	handleCafeMenuCreate = () => {
		const {
			toggleModal
		} = this.props;

		toggleModal('cafeMenuCreate');
	}

	handleCafeMenuCreateSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			cafeMenuCreate
		} = this.state;

		let requiredData = {
			cafe: type.id,
			name: cafeMenuCreate.name,
			price: cafeMenuCreate.price,
			description: cafeMenuCreate.description
		}

		dispatch(createCafeMenu(requiredData, accessToken));
	}

	handleCafeMenuUpdate = (cafeMenu) => {
		const {
			type,
			toggleModal
		} = this.props;

		const {
			selectedCafeMenu
		} = this.state;

		console.log(cafeMenu);

		this.setState({
			selectedCafeMenu: {
				cafe: type.id,
				id: cafeMenu.id,
				name: cafeMenu.name,
				price: cafeMenu.price,
				description: cafeMenu.description
			}
		})

		toggleModal('cafeMenuUpdate');
	}

	handleCafeMenuUpdateSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			selectedCafeMenu
		} = this.state;

		let requiredData = {
			cafe: selectedCafeMenu.cafe,
			id: selectedCafeMenu.id,
			name: selectedCafeMenu.name,
			price: selectedCafeMenu.price,
			description: selectedCafeMenu.description
		}

		dispatch(updateCafeMenu(requiredData, accessToken));
	}

	handleCafeMenuDelete = (cafeMenu) => {
		const {
			dialog,
			dispatch,
			type,
			toggleModal
		} = this.props;

		const {
			selectedCafeMenu
		} = this.state;

		this.setState({
			selectedCafeMenu: {
				cafe: type.id,
				id: cafeMenu.id,
				name: cafeMenu.name,
				price: cafeMenu.price,
				description: cafeMenu.description
			}
		})

		let dialogData = {
			type: 'confirm',
			title: 'Perhatian!',
			message: `Anda akan menghapus data cafe menu dengan nama ${cafeMenu.name}. Aksi ini tidak dapat dipulihkan. Apakah Anda yakin ingin menghapusnya?`,
			cancel: true,
			cancelText: 'Batalkan',
			confirm: () => this.handleCafeMenuDeleteSubmit(),
			confirmText: 'Ya, Lanjutkan'
		}

		dispatch(toggleDialog(dialogData, dialog.isOpen));
	}

	handleCafeMenuDeleteSubmit = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			selectedCafeMenu
		} = this.state;

		let requiredData = {
			id: selectedCafeMenu.id
		}

		dispatch(deleteCafeMenu(requiredData, accessToken));
	}

	getAllCafeMenu = () => {
		const {
			type,
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			cafe: type.id
		}

		dispatch(getAllCafeMenu(requiredData, accessToken));
	}

	render = () => {
		return (
			<SettingsCafeType
				{...this.state}
				{...this.props}
				handleInputChange={this.handleInputChange}
				handleCafeMenuCreate={this.handleCafeMenuCreate}
				handleCafeMenuCreateSubmit={this.handleCafeMenuCreateSubmit}
				handleCafeMenuUpdate={this.handleCafeMenuUpdate}
				handleCafeMenuUpdateSubmit={this.handleCafeMenuUpdateSubmit}
				handleCafeMenuDelete={this.handleCafeMenuDelete}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeList: state.cafe.list
	}
}

export default connect(mapStateToProps)(SettingsCafeTypeContainer);
