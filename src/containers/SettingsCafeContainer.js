import React from 'react';
import { connect } from 'react-redux';
import {
	getCafeTypes,
	updateCafeMenu
} from '../actions/cafe.action';
import { SettingsCafe } from '../components/Settings';

class SettingsCafeContainer extends React.Component {
	constructor() {
		super();
		this.toggleTab = this.toggleTab.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleNewCafeType = this.handleNewCafeType.bind(this);
		this.state = {
			isModalOpen: {
				cafeTypeCreate: false,
				cafeTypeUpdate: false,
				cafeTypeDelete: false,
				cafeMenuCreate: false,
				cafeMenuUpdate: false,
				cafeMenuDelete: false,
			},
			cafeTypeCreate: {
				name: ''
			},
			activeTab: 0
		}
	}

	componentDidMount = () => {
		this.getCafeTypes();
	}

	// componentDidUpdate = (prevProps) => {
	// 	const {
	// 		cafe,
	// 		dialog,
	// 		dispatch,
	// 		toggleDialog,
	// 		showDialog
	// 	} = this.props;
	//
	// 	if(prevProps.service !== this.props.service) {
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
	// 			dialogData.success.message = 'Perubahan informasi menu telah berhasil. Klik tombol berikut untuk kembali.'
	//
	// 			toggleDialog(dialogData.success);
	// 		}
	//
	// 		else if(cafe.isCreated) {
	// 			dialogData.success.title = 'Berhasil!';
	// 			dialogData.success.message = 'Menu telah berhasil ditambahkan. Klik tombol berikut untuk kembali.'
	//
	// 			toggleDialog(dialogData.success);
	// 		}
	//
	// 		else if(cafe.isDeleted) {
	// 			dialogData.success.title = 'Berhasil!';
	// 			dialogData.success.message = 'Menu telah berhasil dihapus. Klik tombol berikut untuk kembali.';
	//
	// 			showDialog(dialogData.success);
	// 		}
	// 	}
	// }

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

	handleNewCafeType = () => {
		this.toggleModal('cafeTypeCreate');
	}

	handleNewCafeTypeSubmit = (e) => {
		e.preventDefault();
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
				handleNewCafeType={this.handleNewCafeType}
				handleNewCafeTypeSubmit={this.handleNewCafeTypeSubmit}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeTypes: state.cafe.types
	}
}

export default connect(mapStateToProps)(SettingsCafeContainer);
