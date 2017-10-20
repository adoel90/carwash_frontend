import React from 'react';
import ServiceType from '../components/ServiceType';

import { connect } from 'react-redux';
import { fetchServices } from '../actions/service.action';

class ServiceTypeContainer extends React.Component {
	componentDidMount() {
		this.props.fetchServices();
	}

	render() {
		return this.props.service.isLoaded
		? <ServiceType {...this.state} {...this.props} />
		: null;
	}
}

const mapStateToProps = (state, props) => {
	const service = state.service;

	return {
		service
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { data } = ownProps;
	const requiredData = {
		type: data.id,
		limit: 10,
		offset: 0
	}

	return {
		fetchServices: () => dispatch(fetchServices(requiredData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTypeContainer);
