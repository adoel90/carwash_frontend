import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getAllCafeMenu,
	getCafeMenuList,
	createCafeMenu,
	updateCafeMenu,
	changeCafeMenuStatus,
	deleteCafeMenu
} from '../actions/cafe.action';
import { SettingsCafeType } from '../components/Settings';

class SettingsCafeTypeContainer extends Component {
	constructor() {
		super();
		this.getAllCafeMenu = this.getAllCafeMenu.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCafeMenuCreate = this.handleCafeMenuCreate.bind(this);
		this.handleCafeMenuUpdate = this.handleCafeMenuUpdate.bind(this)
		this.handleChangeCafeMenuStatus = this.handleChangeCafeMenuStatus.bind(this);
		// this.handleCafeMenuDelete = this.handleCafeMenuDelete.bind(this);
		// this.handleCafeMenuDeleteSubmit = this.handleCafeMenuDeleteSubmit.bind(this);

		this.state = {
			cafeList: [],
			searchText: '',
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
		const { cafeList } = this.state;
		const {
			cafe,
			dispatch,
			dialog,
			toggleDialog,
			showDialog
		} = this.props;

		if(prevProps.cafe.list !== cafe.list) {
			if(cafe.list.isLoaded) {
				this.setState({
					cafeList: cafe.list.data
				})
			}
		}

		if(prevProps.cafe.menu !== cafe.menu) {
			let dialogData = {};

			if(cafe.menu.isUpdated) {
				dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Menu ini telah berhasil diperbarui. Klik tombol berikut untuk kembali.',
					onClose: () => window.location.reload(),
					closeText: 'Kembali'
				}

				toggleDialog(dialogData);
			}

			if(cafe.menu.isStatusChanging) {
				cafeList.map((item) => {
					if(item.id === cafe.menu.id) {
						item.statusChanging = true;
						this.forceUpdate();
					}
				});
			}

			if(cafe.menu.isStatusChanged) {
				cafeList.map((item) => {
					if(item.id === cafe.menu.id) {
						item.statusChanging = false;

						if(item.status) {
							item.status = false;
						}
						else {
							item.status = true;
						}
					}
				})

				this.forceUpdate();
			}
		}

	// 	if(prevProps.cafe !== this.props.cafe) {
	// 		let dialogData = {
	// 			success: {
	// 				type: 'success',
	// 				title: '',
	// 				message: '',
	// 				onClose: () => {
	// 					window.location.reload()
	// 				},
	// 				closeText: 'Kembali'
	// 			}
	// 		}
	//
	// 		if(cafe.isUpdated) {
	// 			dialogData.success.title = 'Berhasil!';
	// 			dialogData.success.message = 'Perubahan terhadap menu cafe berhasil. Klik tombol berikut untuk kembali.';
	// 			toggleDialog(dialogData.success);
	// 		}
	//
	// 		if(cafe.isCreated) {
	// 			dialogData.success.title = 'Berhasil';
	// 			dialogData.success.message = 'Menu baru telah berhasil ditambah. Klik tombol berikut untuk kembali.';
	// 			toggleDialog(dialogData.success);
	// 		}
	//
	// 		if(cafe.isDeleted) {
	// 			dialogData.success.title = 'Berhasil!';
	// 			dialogData.success.message = 'Penghapusan menu cafe berhasil. Klik tombol berikut untuk kembali.';
	// 			showDialog(dialogData.success);
	// 		}
	// 	}
	// }
	}

	handleImageChange = (object, e) => {
		const target = e.target;
		const files = target.files;
		const name = target.name;

		let reader = new FileReader();
		let file = files[0];

		reader.onloadend = () => {
			if(object) {
				object['image'] = file;
				object['imagePreview'] = reader.result
				this.forceUpdate();
			}
		}

		reader.readAsDataURL(file);
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
			type,
			dispatch,
			accessToken
		} = this.props;

		const {
			cafeMenuCreate
		} = this.state;

		let requiredData = {
			cafe: type.id,
			name: cafeMenuCreate.name,
			price: parseInt(cafeMenuCreate.price.replace(/'/g, '')),
			description: cafeMenuCreate.description,
			image: cafeMenuCreate.image
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
			price: parseInt(selectedCafeMenu.price.replace(/,/g, '')),
			description: selectedCafeMenu.description
		}

		dispatch(updateCafeMenu(requiredData, accessToken));
	}

	handleChangeCafeMenuStatus = (menu) => {
		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: menu.id
		}

		dispatch(changeCafeMenuStatus(requiredData, accessToken));
	}

	handleCafeMenuDelete = (cafeMenu) => {
		const {
			dialog,
			dispatch,
			type,
			toggleModal,
			toggleDialog
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
			confirmText: 'Ya, Lanjutkan',
			closeText: 'Kembali',
			onConfirm: () => this.handleCafeMenuDeleteSubmit(),
			onClose: toggleDialog
		}

		toggleDialog(dialogData);
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
				handleImageChange={this.handleImageChange}
				handleCafeMenuCreate={this.handleCafeMenuCreate}
				handleCafeMenuCreateSubmit={this.handleCafeMenuCreateSubmit}
				handleCafeMenuUpdate={this.handleCafeMenuUpdate}
				handleCafeMenuUpdateSubmit={this.handleCafeMenuUpdateSubmit}
				handleChangeCafeMenuStatus={this.handleChangeCafeMenuStatus}
				handleCafeMenuDelete={this.handleCafeMenuDelete}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(SettingsCafeTypeContainer);
