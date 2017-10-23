import React from 'react';
import ServiceType from '../components/ServiceType';

import { connect } from 'react-redux';
import { getServiceList } from '../actions/service.action';

class ServiceTypeContainer extends React.Component {
	componentWillMount() {
		this.props.getServiceList();
	}

	render() {
		return this.props.service.isLoaded
		? <ServiceType {...this.state} {...this.props} />
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

const mapDispatchToProps = (dispatch, ownProps) => {
	const { type } = ownProps;
	const requiredData = {
		type: type.id,
		limit: 10,
		offset: 0
	}

	return {
		getServiceList: () => dispatch(getServiceList(requiredData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTypeContainer);
