import React from 'react';
import { connect } from 'react-redux';
import {
	updateCafeMenu,
	getCafeTypes,
	updateCafeType,
	createCafeType,
	changeCafeTypeStatus,
} from '../actions/cafe.action';
import { SettingsCafe } from '../components/Settings';
import { sortBy } from '../utils';

class SettingsCafeContainer extends React.Component {
	constructor() {
		super();
		this.toggleTab = this.toggleTab.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputIndexChange = this.handleInputIndexChange.bind(this);
		this.handleCafeTypeSettings = this.handleCafeTypeSettings.bind(this);
		this.handleNewCafeTypeSubmit = this.handleNewCafeTypeSubmit.bind(this);
		this.handleUpdateCafeTypeSubmit = this.handleUpdateCafeTypeSubmit.bind(this);
		this.handleChangeCafeTypeStatus = this.handleChangeCafeTypeStatus.bind(this);

		this.state = {
			cafeTypes: {
				all: [],
				active: []
			},
			isModalOpen: {
				cafeTypeSettings: false,
				cafeMenuCreate: false,
				cafeMenuUpdate: false
			},
			newCafeType: {
				name: ''
			},
			activeTab: 0
		}
	}

	componentDidMount = () => {
		this.getCafeTypes();
	}

	componentDidUpdate = (prevProps) => {
		const { cafeTypes } = this.state;
		const {
			cafe,
			toggleDialog,
		 	hideDialog
		} = this.props;

		if(prevProps.cafe.types !== cafe.types) {
			if(cafe.types.isLoaded) {
				let activeTypes = [];

				cafe.types.data.map((type) => {
					if(type.status) {
						activeTypes = activeTypes.concat([type]);
					}
				})

				this.setState({
					...this.state,
					cafeTypes: {
						...this.state.cafeTypes,
						all: cafe.types.data.sort(sortBy('name')),
						active: activeTypes.sort(sortBy('name'))
					}
				})

				// let sortedTypes = cafe.types.data.sort(sortBy('name'));
				// let activeTypes = [];
				//
				// sortedTypes.map((type) => {
				// 	if(type.status) {
				// 		activeTypes.push(type);
				// 	}
				// });
				//
				// this.setState({
				// 	cafeTypes: {
				// 		all: sortedTypes,
				// 		active: activeTypes
				// 	}
				// })
			}
		}

		if(prevProps.cafe.type !== cafe.type) {
			if(cafe.type.isUpdated) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Kategori cafe telah berhasil diperbarui. Klik tombol berikut untuk kembali.',
					onClose: () => hideDialog(),
					closeText: 'Tutup'
				}

				toggleDialog(dialogData);
			}

			if(cafe.type.isStatusChanging) {
				cafeTypes.all.forEach((item) => {
					if(item.id === cafe.type.id) {
						item.statusChanging = true;
						this.forceUpdate();
					}
				})
			}

			if(cafe.type.isStatusChanged) {
				cafeTypes.all.forEach((item) => {
					if(item.id === cafe.type.id) {
						item.statusChanging = false;

						if(item.status) {
							item.status = false;
						}
						else {
							item.status = true;
						}

						this.getCafeTypes();
						this.forceUpdate();
					}
				})
			}

			if(cafe.type.isCreated) {
				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: 'Kategori berhasil ditambahkan. Klik tombol berikut untuk kembali.',
					onClose: () => hideDialog(),
					closeText: 'Tutup'
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

	handleCafeTypeSettings = () => {
		const {
			cafeTypes
		} = this.state;

		this.toggleModal('cafeTypeSettings');
	}

	handleNewCafeType = () => {
		this.toggleModal('cafeTypeCreate');
	}

	handleNewCafeTypeSubmit = (e) => {
		e.preventDefault();

		const { newCafeType } = this.state;
		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			name: newCafeType.name
		}

		dispatch(createCafeType(requiredData, accessToken));
	}

	handleUpdateCafeTypeSubmit = (cafeType, e) => {
		e.preventDefault();

		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: cafeType.id,
			name: cafeType.name
		}

		dispatch(updateCafeType(requiredData, accessToken));
	}

	handleChangeCafeTypeStatus = (cafeType) => {
		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: cafeType.id
		}

		dispatch(changeCafeTypeStatus(requiredData, accessToken));
	}

	getCafeTypes = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getCafeTypes(accessToken));
	}

	render() {
		return (
			<SettingsCafe
				{...this.state}
				{...this.props}
				toggleTab={this.toggleTab}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleInputIndexChange={this.handleInputIndexChange}
				handleCafeTypeSettings={this.handleCafeTypeSettings}
				handleUpdateCafeType={this.handleUpdateCafeType}
				handleNewCafeTypeSubmit={this.handleNewCafeTypeSubmit}
				handleUpdateCafeTypeSubmit={this.handleUpdateCafeTypeSubmit}
				handleChangeCafeTypeStatus={this.handleChangeCafeTypeStatus}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(SettingsCafeContainer);
