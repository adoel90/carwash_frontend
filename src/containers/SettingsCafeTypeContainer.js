import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getCafeMenuList,
	createNewCafeMenu,
	updateCafeMenu
} from '../actions/cafe.action';

import { SettingsCafeType } from '../components/Settings';

class SettingsCafeTypeContainer extends Component {
	constructor() {
		super();
		this.toggleNewMenuModal = this.toggleNewMenuModal.bind(this);
		this.toggleEditMenuModal = this.toggleEditMenuModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleEditMenu = this.handleEditMenu.bind(this);
		this.handleNewMenu = this.handleNewMenu.bind(this);

		this.state = {
			menu: {
				id: '',
				name: '',
				price: '',
				description: ''
			},
			isModalOpen: {
				newMenu: false,
				editMenu: false
			}
		}
	}

	handleNewMenu = () => {
		const {
			type,
			accessToken,
			dispatch
		} = this.props;

		const {
			menu
		} = this.state;

		const requiredData = {
			cafe: type.id,
			name: menu.name,
			price: menu.price,
			description: menu.description,
			image: menu.image
		}

		dispatch(createNewCafeMenu(requiredData, accessToken));
	}

	handleEditMenu = () => {
		const {
			type,
			accessToken,
			dispatch
		} = this.props;

		const {
			menu
		} = this.state;

		const requiredData = {
			cafe: type.id,
			id: menu.id,
			name: menu.name,
			price: menu.price,
			description: menu.description
		}

		dispatch(updateCafeMenu(requiredData, accessToken));
	}

	handleInputChange = (e) => {
		const target = e.target;
		const value = e.target.value;
		const name = target.name;

		this.setState({
			menu: {
				...this.state.menu,
				[name]: value
			}
		})
	}

	handlePhotoChange = (data) => {
		if(data && data[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.setState({
					menu: {
						...this.state.menu,
						image: e.target.result
					}
				})
			}

			reader.readAsDataURL(data[0]);
		}
	}

	toggleEditMenuModal = (item) => {
		const {
			isModalOpen
		} = this.state

		if(!isModalOpen.editMenu) {
			this.setState({
				menu: {
					id: item.id,
					name: item.name,
					price: item.price,
					description: item.description
				}
			})
		}

		this.setState({
			isModalOpen: {
				editMenu: !isModalOpen.editMenu
			}
		})
	}

	toggleNewMenuModal = () => {
		this.setState({
			isModalOpen: {
				newMenu: !this.state.isModalOpen.newMenu
			}
		})
	}

	componentDidMount = () => {
		const {
			dispatch,
			type,
			accessToken
		} = this.props;

		const requiredData = {
			cafe: type.id,
			limit: 10,
			offset: 0
		}

		dispatch(getCafeMenuList(requiredData, accessToken))
	}

	render() {
		return (
			<SettingsCafeType
				{...this.state}
				{...this.props}
				toggleEditMenuModal={this.toggleEditMenuModal}
				toggleNewMenuModal={this.toggleNewMenuModal}
				handleInputChange={this.handleInputChange}
				handlePhotoChange={this.handlePhotoChange}
				handleNewMenu={this.handleNewMenu}
				handleEditMenu={this.handleEditMenu}
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
