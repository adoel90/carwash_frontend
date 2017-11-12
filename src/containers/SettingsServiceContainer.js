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
			newService: {
				name: ''
			}
		}
		this.getServiceTypes = this.getServiceTypes.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
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

	handleInputChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		this.setState({
			newService: {
				...this.state.newService,
				[name]: value
			}
		})
	}

	handleNewServiceType = () => {
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

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		})
	}

	render() {
		return (
			<SettingsService
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleNewServiceType={this.handleNewServiceType}
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
