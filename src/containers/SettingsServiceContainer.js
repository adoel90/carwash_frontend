import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getServiceTypes,
	createNewServiceType
} from '../actions/service.action';
import { SettingsService } from '../components/Settings';

class SettingsServiceContainer extends Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: false,
			activeTab: 1
		}
		this.getServiceTypes = this.getServiceTypes.bind(this);
		this.handleNewServiceType = this.handleNewServiceType.bind(this);

	}

	componentWillMount = () => {
		this.getServiceTypes();
	}

	getServiceTypes = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getServiceTypes(accessToken));
	}

	// handleInputChange = (e) => {
	// 	const target = e.target;
	// 	const name = target.name;
	// 	const value = target.value;
	//
	// 	this.setState({
	// 		newService: {
	// 			...this.state.newService,
	// 			[name]: value
	// 		}
	// 	})
	// }
	//
	// handleNewServiceType = () => {
	// 	const {
	// 		dispatch,
	// 		accessToken,
	// 		newService
	// 	} = this.state;
	//
	// 	const requiredData = {
	// 		name: newService.name
	// 	}
	//
	// 	dispatch(createNewServiceType(requiredData, accessToken));
	// }
	//
	// toggleModal = () => {
	// 	this.setState({
	// 		isModalOpen: !this.state.isModalOpen
	// 	})
	// }

	render() {
		const {
			activeTab
		} = this.state;

		return (
			<SettingsService
				{...this.props}
				{...this.state}
				activeTab={activeTab}
				handleNewServiceType={handleNewServiceType}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service
	}
}

export default connect(mapStateToProps)(SettingsServiceContainer);
