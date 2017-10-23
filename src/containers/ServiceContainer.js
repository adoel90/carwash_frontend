import React from 'react';
import Service from '../components/Service';

import { connect } from 'react-redux';
import { getServiceTypes } from '../actions/service.action.js';

class ServiceContainer extends React.Component {
	constructor() {
		super();
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);
	}

	addPathPropToTypes = () => {
		this.props.serviceTypes.map((type, i) => {
			type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}

	componentDidMount = () => {
		this.props.getServiceTypes();
	}

	render() {
		if(this.props.service.isLoaded) {
			this.addPathPropToTypes();
		}

		console.log(this.props.service);

		return this.props.service.isLoaded
		? <Service {...this.state} {...this.props} />
		: null;
	}
}

const mapStateToProps = (state, props) => {
	const service = state.service;
	const serviceTypes = state.service.types;

	return {
		service,
		serviceTypes
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getServiceTypes: () => dispatch(getServiceTypes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);