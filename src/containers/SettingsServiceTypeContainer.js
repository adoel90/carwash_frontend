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
		this.state = {
			serviceList: []
		}
	}

	componentDidMount = () => {
		this.getAllServiceList();
	}

	componentDidUpdate = (prevProps) => {
		const {
			service
		} = this.props;

		if(prevProps.service.list !== service.list) {
			if(service.list.isLoaded) {
				this.setState({
					serviceList: service.list.data
				})

				// this.setState({
				// 	serviceList: service.list.data
				// })
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

	render() {
		return (
			<SettingsServiceType
				{...this.state}
				{...this.props}
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
