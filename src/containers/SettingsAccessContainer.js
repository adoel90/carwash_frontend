import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
	getAllAccess,
	getAccessDetail,
	createAccess,
	updateAccess,
	changeAccessStatus
} from '../actions/access.action'

import { getAllModule } from '../actions/module.action'

import { SettingsAccess } from '../components/Settings'

class SettingsAccessContainer extends Component {
	constructor() {
		super();
		this.getAllAccess = this.getAllAccess.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleModuleChange = this.handleModuleChange.bind(this);
		this.handleUpdateAccess = this.handleUpdateAccess.bind(this);
		this.handleUpdateAccessSubmit = this.handleUpdateAccessSubmit.bind(this);
		this.handleChangeAccessStatus = this.handleChangeAccessStatus.bind(this);
		this.handleCreateAccess = this.handleCreateAccess.bind(this);
		this.handleCreateAccessSubmit = this.handleCreateAccessSubmit.bind(this);
		this.state = {
			accessList: {},
			accessDetail: {},
			moduleList: {},
			selectedAccess: {},
			newAccess: {
				name: '',
				module: [],
			},
			search: {
				searchText: '',
				searchBy: 'name'
			},
			isModalOpen: {
				updateAccess: false,
				createAccess: false
			}
		}
	}

	componentDidMount = () => {
		this.getAllAccess();
		this.getAllModule();
	}

	componentDidUpdate = (prevProps) => {
		const {
			access,
			module,
			toggleDialog
		} = this.props;
		
		const {
			accessList,
			moduleList
		} = this.state;

		if(prevProps.access.list !== access.list) {
			this.setState({
				accessList: access.list
			}, () => {
				this.forceUpdate();
			});
		}

		if(prevProps.access.new !== access.new) {
			if(access.new.isCreated) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: 'Level akses baru telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
					onClose: () => window.location.reload(),
					closeText: 'Kembali'
				}

				toggleDialog(dialogData);
			}
		}

		if(prevProps.access.item !== access.item) {
			if(access.item.isDetailLoaded) {
				this.setState({
					accessDetail: access.item
				}, () => {
					let accessCopy = Object.assign({}, access.item.data);
					this.setState({
						selectedAccess: accessCopy
					}, () => {
						this.forceUpdate();
					});
				});
			}

			if(access.item.isUpdated) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil!',
					message: 'Akses level telah berhasil diperbarui. Klik tombol berikut untuk kembali.',
					onClose: () => window.location.reload(),
					closeText: 'Kembali'
				}
				
				toggleDialog(dialogData);
			}

			if(access.item.isStatusChanging) {
				accessList.data.forEach((item) => {
					if(item.id === access.item.id) {
						item.statusChanging = true;
						this.forceUpdate();
					}
				})
			}

			if(access.item.isStatusChanged) {
				accessList.data.forEach((item) => {
					if(item.id === access.item.id) {
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

		if(prevProps.module.list !== module.list) {
			this.setState({
				moduleList: module.list
			}, () => {
				this.forceUpdate();
			})
		}
		
	}

	getAllAccess = () => {
		const { 
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllAccess(accessToken));
	}

	getAllModule = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllModule(accessToken));
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

	handleModuleChange = (object, selectedItem, e) => {
		let objectCopy = Object.assign({}, object);

		let found = objectCopy.module.some((item, i) => {
			return selectedItem.id === item.id
		})

		if(!found) {
			objectCopy.module.push(selectedItem);
			this.forceUpdate();
		}
		else {
			objectCopy.module.some((item, i) => {
				if(selectedItem.id === item.id) {
					objectCopy.module.splice(i, 1);
					this.forceUpdate();
				}
			})
		}
	}
	
	handleUpdateAccess = (access, e) => {
		const {
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			id: access.id
		}

		dispatch(getAccessDetail(requiredData, accessToken)).then(() => {
			this.toggleModal('updateAccess');
		});
	}

	handleUpdateAccessSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			selectedAccess
		} = this.state;

		if(selectedAccess.module.length) {
			let moduleCopy = [];

			selectedAccess.module.forEach((item) => {
				moduleCopy.push(item.id);
			})

			let requiredData = {
				id: selectedAccess.id,
				name: selectedAccess.name,
				module: moduleCopy
			}

			dispatch(updateAccess(requiredData, accessToken));
		}
		else {
			let errorData = {
				message: 'Modul harus dipilih setidaknya satu.'
			}

			this.setState({
				selectedAccess: {
					...this.state.selectedAccess,
					error: errorData,
					isError: true
				}
			})
		}
		
	}

	handleChangeAccessStatus = (access, e) => {
		e.stopPropagation();

		const {
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			id: access.id
		}

		dispatch(changeAccessStatus(requiredData, accessToken));
	}

	handleCreateAccess = () =>  {
		this.setState({
			newAccess: {
				name: '',
				module: []
			}
		})

		this.toggleModal('createAccess');
	}

	handleCreateAccessSubmit = (e) => {
		e.preventDefault();

		const {
			newAccess
		} = this.state;

		const {
			accessToken,
			dispatch
		} = this.props;

		if(newAccess.module.length) {
			let moduleCopy = [];

			newAccess.module.forEach((item) => {
				moduleCopy.push(item.id);
			})

			let requiredData = {
				name: newAccess.name,
				module: moduleCopy
			}

			dispatch(createAccess(requiredData, accessToken));
		}
		else {
			let errorData = {
				message: 'Silahkan pilih setidaknya satu modul untuk membuat akses level baru.'
			}

			this.setState({
				newAccess: {
					...this.state.newAccess,
					error: errorData,
					isError: true
				}
			})
		}
	}

	render() {
		return (
			<SettingsAccess
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleModuleChange={this.handleModuleChange}
				handleUpdateAccess={this.handleUpdateAccess}
				handleUpdateAccessSubmit={this.handleUpdateAccessSubmit}
				handleChangeAccessStatus={this.handleChangeAccessStatus}
				handleCreateAccess={this.handleCreateAccess}
				handleCreateAccessSubmit={this.handleCreateAccessSubmit}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		access: state.access,
		module: state.module
	}
}

export default connect(mapStateToProps)(SettingsAccessContainer);