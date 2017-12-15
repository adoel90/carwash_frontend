import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getServiceList,
	getAllServiceList,
	createNewService,
	updateService
} from '../actions/service.action';
import { SettingsServiceType } from '../components/Settings';

class SettingsServiceTypeContainer extends React.Component {
	constructor() {
		super();
		this.getAllServiceList = this.getAllServiceList.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			serviceList: [],
			search: {
				searchText: '',
				searchBy: 'name'
			}
		}
	}

	componentDidMount = () => {
		this.getAllServiceList();
	}

	componentDidUpdate = (prevProps) => {
		const { serviceList } = this.state;
		const {
			service
		} = this.props;

		if(prevProps.service.item !== service.item) {
			if(service.item.isStatusChanging) {
				serviceList.forEach((item) => {
					if(item.id === service.item.id) {
						item.statusChanging = true;
						this.forceUpdate();
					}
				})
			}

			if(service.item.isStatusChanged) {
				serviceList.forEach((item) => {
					if(item.id === service.item.id) {
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

		if(prevProps.service.list !== service.list) {
			if(service.list.isLoaded) {
				this.setState({
					serviceList: service.list.data
				})
			}
		}
	}

	getAllServiceList = () => {
		const {
			dispatch,
			accessToken,
			type
		} = this.props;

		const requiredData = {
			type: type.id
		}

		dispatch(getAllServiceList(requiredData, accessToken));
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

	render() {
		return (
			<SettingsServiceType
				{...this.state}
				{...this.props}
				handleInputChange={this.handleInputChange}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service
	}
}

export default connect(mapStateToProps)(SettingsServiceTypeContainer);
