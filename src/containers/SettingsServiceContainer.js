import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getServiceTypes,
	deleteService,
	updateService,
	createNewServiceType
} from '../actions/service.action';
import { SettingsService } from '../components/Settings';

class SettingsServiceContainer extends Component {
	constructor() {
		super();
		this.getServiceTypes = this.getServiceTypes.bind(this);
		this.toggleTab = this.toggleTab.bind(this);
		this.handleNewServiceType = this.handleNewServiceType.bind(this);
		this.handleNewServiceTypeSubmit = this.handleNewServiceTypeSubmit.bind(this);
		this.handleServiceUpdate = this.handleServiceUpdate.bind(this);
		this.handleServiceDelete = this.handleServiceDelete.bind(this);

		this.state = {
			isModalOpen: false,
			activeTab: 0
		}
	}

	componentWillMount = () => {
		this.getServiceTypes();
	}

	toggleTab = (tabIndex) => {
		this.setState({
			activeTab: tabIndex
		})
	}

	getServiceTypes = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getServiceTypes(accessToken));
	}

	handleServiceUpdate = () => {

	}

	handleServiceDelete = () => {

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

	handleNewServiceType = () => {

	}

	handleNewServiceTypeSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken,
			newService
		} = this.state;

		const requiredData = {
			name: newService.name
		}

		dispatch(createNewServiceType(requiredData, accessToken));
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
				handleNewServiceType={this.handleNewServiceType}
				handleNewServiceTypeSubmit={this.handleNewServiceTypeSubmit}
				handleServiceUpdate={this.handleServiceUpdate}
				handleServiceDelete={this.handleServiceDelete}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service,
		serviceTypes: state.service.types
	}
}

export default connect(mapStateToProps)(SettingsServiceContainer);
