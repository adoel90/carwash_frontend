import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getServiceTypes,
	createNewService,
	deleteService,
	updateService,
	changeServiceStatus,
	createNewServiceType,
	updateServiceType,
	changeServiceTypeStatus
} from '../actions/service.action';
import {
	showDialog,
	hideDialog
} from '../actions/dialog.action';
import { SettingsService } from '../components/Settings';
import { sortBy } from '../utils';

class SettingsServiceContainer extends Component {
	constructor() {
		super();
		this.getServiceTypes = this.getServiceTypes.bind(this);
		this.toggleTab = this.toggleTab.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputIndexChange = this.handleInputIndexChange.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleNewServicte = this.handleNewService.bind(this);
		this.handleNewServiceSubmit = this.handleNewServiceSubmit.bind(this);
		this.handleServiceUpdate = this.handleServiceUpdate.bind(this);
		this.handleServiceUpdateSubmit = this.handleServiceUpdateSubmit.bind(this);
		this.handleChangeServiceStatus = this.handleChangeServiceStatus.bind(this);
		this.handleServiceTypeSettings = this.handleServiceTypeSettings.bind(this);
		// this.handleNewServiceType = this.handleNewServiceType.bind(this);
		this.handleNewServiceTypeSubmit = this.handleNewServiceTypeSubmit.bind(this);
		this.handleUpdateServiceType = this.handleUpdateServiceType.bind(this);
		this.handleUpdateServiceTypeSubmit = this.handleUpdateServiceTypeSubmit.bind(this);
		this.handleChangeServiceTypeStatus = this.handleChangeServiceTypeStatus.bind(this);

		this.state = {
			searchText: '',
			serviceTypes: {
				all: [],
				active: []
			},
			newService: {
				type: '',
				name: '',
				price: '',
				description: '',
				image: '',
				imagePreview: ''
			},
			newServiceType: {
				name: ''
			},
			selectedService: {
				id: '',
				name: '',
				price: '',
				description: ''
			},
			isModalOpen: {
				editService: false,
				newService: false,
				serviceTypeSetings: false,
			},
			activeTab: 0
		}
	}

	componentWillMount = () => {
		this.getServiceTypes();
	}

	componentDidUpdate = (prevProps) => {
		const { newServiceType } = this.state;
		const {
			service,
			dialog,
			dispatch,
			hideDialog,
			toggleDialog,
			showDialog
		} = this.props;

		const {
			serviceTypes
		} = this.state;

		if(prevProps.service.types !== service.types) {
			if(service.types.isLoaded) {
				let sortedTypes = service.types.data.sort(sortBy('name'))
				let activeTypes = [];

				service.types.data.map((type) => {
					if(type.status) {
						activeTypes.push(type);
					}
				})

				this.setState({
					serviceTypes: {
						all: sortedTypes,
						active: activeTypes
					}
				})
			}
		}

		if(prevProps.service.type !== service.type) {
			if(service.type.isUpdated) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: 'Informasi kategori telah berhasil diubah.',
					onClose: () => hideDialog(),
					closeText: 'Tutup'
				}

				toggleDialog(dialogData);
			}

			if(service.type.isStatusChanging) {
				service.types.data.forEach((item) => {
					if(item.id === service.type.id) {
						item.statusChanging = true;
						this.forceUpdate();
					}
				})
			}

			if(service.type.isStatusChanged) {
				service.types.data.forEach((item) => {
					if(item.id === service.type.id) {
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

				this.getServiceTypes();
			}

			if(service.type.isCreated) {
				this.getServiceTypes();
			}
		}

		if(prevProps.service.item !== service.item) {
			let dialogData = {};

			if(service.item.isUpdated) {
				dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: 'Perubahan service telah berhasil. Klik tombol berikut untuk kembali.',
					onClose: () => {
						window.location.reload()
					},
					closeText: 'Kembali'
				}

				toggleDialog(dialogData);
			}

			else if(service.item.isCreated) {
				dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: 'Penambahan service telah berhasil. Klik tombol berikut untuk kembali.',
					onClose: () => {
						window.location.reload()
					},
					closeText: 'Kembali'
				}

				toggleDialog(dialogData);
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

	handleInputIndexChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[index].name = value;
		this.forceUpdate();
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


	toggleTab = (tabIndex) => {
		this.setState({
			activeTab: tabIndex
		})
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

	getServiceTypes = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getServiceTypes(accessToken));
	}

	handleNewService = (type) => {
		this.setState({
			newService: {
				...this.state.newService,
				type: type.id
			}
		})

		this.toggleModal('newService');
	}

	handleNewServiceSubmit = (e) => {
		e.preventDefault();

		const {
			accessToken,
			dispatch
		} = this.props;

		const {
			newService
		} = this.state;

		let requiredData = {
			type: newService.type,
			name: newService.name,
			price: parseInt(newService.price.replace(/,/g, '')),
			description: newService.description,
			image: newService.image
		}

		dispatch(createNewService(requiredData, accessToken));
	}

	handleServiceUpdate = (service) => {
		this.setState({
			selectedService: {
				id: service.id,
				name: service.name,
				price: service.price,
				description: service.description
			}
		})

		this.toggleModal('editService');
	}

	handleServiceUpdateSubmit = (e) => {
		e.preventDefault();

		const {
			selectedService
		} = this.state;

		const {
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			id: selectedService.id,
			name: selectedService.name,
			price: parseInt(selectedService.price.replace(/,/g, '')),
			description: selectedService.description
		}

		dispatch(updateService(requiredData, accessToken));
	}

	handleChangeServiceStatus = (service) => {
		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: service.id
		}

		dispatch(changeServiceStatus(requiredData, accessToken))
	}

	handleServiceDelete = (service) => {
		const {
			dialog,
			dispatch,
			toggleDialog
		} = this.props;

		this.setState({
			selectedService: {
				id: service.id,
				name: service.name,
				price: service.price,
				description: service.description
			}
		})

		const dialogData = {
			type: 'confirm',
			title: 'Perhatian!',
			message: 'Anda akan menghapus service beserta seluruh informasinya. Tindakan ini tidak dapat dipulihkan. Apakah Anda ingin menghapus service ini?',
			confirmText: 'Ya, Lanjutkan',
			closeText: 'Batalkan',
			onConfirm: () => this.handleServiceDeleteSubmit(),
			onClose: toggleDialog,
		}

		toggleDialog(dialogData);
		// dispatch(toggleDialog(dialogData, dialog.isOpen));
	}

	handleServiceDeleteSubmit = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		const {
			selectedService
		} = this.state;

		let requiredData = {
			id: selectedService.id,
			name: selectedService.name,
			price: selectedService.price,
			description: selectedService.description,
		}

		dispatch(deleteService(requiredData, accessToken));
	}

	handleServiceTypeSettings = () => {
		this.toggleModal('serviceTypeSettings');
	}

	// handleNewServiceType = () => {
	// 	this.toggleModal('newServiceType');
	// }
	//
	handleNewServiceTypeSubmit = (e) => {
		e.preventDefault();

		const {
			newServiceType
		} = this.state;

		const {
			dispatch,
			accessToken,
		} = this.props;

		const requiredData = {
			name: newServiceType.name
		}

		dispatch(createNewServiceType(requiredData, accessToken));
	}

	handleUpdateServiceType = () => {
	}

	handleUpdateServiceTypeSubmit = (data, e) => {
		e.preventDefault();

		console.log(data);

		const {
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			id: data.id,
			name: data.name
		}

		dispatch(updateServiceType(requiredData, accessToken));
	}

	handleChangeServiceTypeStatus = (data) => {
		const {
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			id: data.id
		}

		dispatch(changeServiceTypeStatus(requiredData, accessToken))
	}

	render() {
		const {
			activeTab
		} = this.state;

		return (
			<SettingsService
				{...this.props}
				{...this.state}
				activeTab={activeTab}
				toggleTab={this.toggleTab}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleInputIndexChange={this.handleInputIndexChange}
				handleImageChange={this.handleImageChange}
				handleNewService={this.handleNewService}
				handleNewServiceSubmit={this.handleNewServiceSubmit}
				handleServiceUpdate={this.handleServiceUpdate}
				handleServiceUpdateSubmit={this.handleServiceUpdateSubmit}
				handleChangeServiceStatus={this.handleChangeServiceStatus}
				handleServiceTypeSettings={this.handleServiceTypeSettings}
				handleNewServiceTypeSubmit={this.handleNewServiceTypeSubmit}
				handleUpdateServiceTypeSubmit={this.handleUpdateServiceTypeSubmit}
				handleChangeServiceTypeStatus={this.handleChangeServiceTypeStatus}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog,
		service: state.service,
		// serviceTypes: state.service.types
	}
}

export default connect(mapStateToProps)(SettingsServiceContainer);
