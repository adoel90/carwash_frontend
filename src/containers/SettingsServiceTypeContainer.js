import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getServiceList,
	createNewService
} from '../actions/service.action';
import { SettingsServiceType } from '../components/Settings';

class SettingsServiceTypeContainer extends Component {
	constructor() {
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleNewService = this.handleNewService.bind(this);

		this.state = {
			isModalOpen: false,
			menu: {
				name: '',
				price: '',
				description: '',
				image: null
			}
		}
	}

	componentDidMount = () => {
		const { dispatch, type, accessToken } = this.props;

		const requiredData = {
			type: type.id,
			limit: 10,
			offset: 0
		}

		dispatch(getServiceList(requiredData, accessToken))
	}

	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen })
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

		console.log(this.state);
	}

	handlePhotoChange = (data) => {
		if(data && data[0]) {
			let reader = new FileReader();
			reader.onload = (e) => {
				this.setState({
					menu: {
						image: e.target.result
					}
				})
			}

			reader.readAsDataURL(data[0]);
		}

		// this.setState({
		// 	image: data
		// })
	}

	handleNewService = () => {
		const {
			type,
			accessToken,
			dispatch
		} = this.props;

		const {
			menu
		} = this.state;

		const requiredData = {
			type: type.id,
			name: menu.name,
			price: menu.price,
			description: menu.description,
			image: menu.image
		}

		dispatch(createNewService(requiredData, accessToken));

	}

	render() {
		const { isModalOpen } = this.state;

		console.log(this.props);

		return <SettingsServiceType
			{...this.props}
			{...this.state}
			isModalOpen={isModalOpen}
			toggleModal={this.toggleModal}
			handleInputChange={this.handleInputChange}
			handlePhotoChange={this.handlePhotoChange}
			handleNewService={this.handleNewService}
		/>
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service,
		serviceList: state.service.list.service
	}
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//
// }

export default connect(mapStateToProps)(SettingsServiceTypeContainer);
