import React from 'react';
import ServiceType from '../components/ServiceType';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import {
	getServiceList,
	createServiceTransaction
} from '../actions/service.action';

import {
	memberLogout
} from '../actions/member.action';

class ServiceTypeContainer extends React.Component {
	constructor() {
		super();
		this.handleServiceTransaction = this.handleServiceTransaction.bind(this);
		this.handleMemberLogout = this.handleMemberLogout.bind(this);
	}

	componentDidMount = () => {
		const {
			accessToken,
			member,
			dispatch,
			type
		} = this.props;

		const requiredData = {
			type: type.id,
			limit: 10,
			offset: 0
		}

		dispatch(getServiceList(requiredData, accessToken));
	}

	handleMemberLogout = () => {
		const {
			match,
			dispatch
		} = this.props;

		return <Redirect from={`${match.url}`} to="/logout" />
	}

	handleServiceTransaction = (serviceId) => {
		const { dispatch, accessToken } = this.props;

		const requiredData = {
			service: serviceId
		}

		dispatch(createServiceTransaction(requiredData, accessToken));
	}

	render() {
		return this.props.service.isLoaded
		? <ServiceType
			{...this.state}
			{...this.props}
			handleServiceTransaction={this.handleServiceTransaction}
			handleMemberLogout={this.handleMemberLogout}
		/>
		: null;
	}
}

const mapStateToProps = (state, props) => {
	const service = state.service;
	const serviceList = state.service.list.service;

	return {
		service,
		serviceList
	};
}

export default connect(mapStateToProps)(ServiceTypeContainer);
