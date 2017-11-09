import React from 'react';
import ServiceType from '../components/ServiceType';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux';
import {
	getServiceList,
	createServiceTransaction
} from '../actions/service.action';

class ServiceTypeContainer extends React.Component {
	constructor() {
		super();
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.handleServiceTransaction = this.handleServiceTransaction.bind(this);
	}

	componentWillMount() {
		this.handleAccessToken();
		// this.props.getServiceList();
	}

	handleServiceTransaction = (serviceId) => {
		const { dispatch, accessToken } = this.props;

		const requiredData = {
			service: serviceId
		}

		dispatch(createServiceTransaction(requiredData, accessToken))
			.then(() => {
				window.location.reload();
			})
	}

	handleAccessToken = () => {
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

	render() {
		return this.props.service.isLoaded
		? <ServiceType
			{...this.state}
			{...this.props}
			handleServiceTransaction={this.handleServiceTransaction}
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

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	const { type } = ownProps;
// 	const requiredData = {
// 		type: type.id,
// 		limit: 10,
// 		offset: 0
// 	}
//
// 	return {
// 		getServiceList: () => dispatch(getServiceList(requiredData))
// 	}
// }

export default withCookies(connect(mapStateToProps)(ServiceTypeContainer));
