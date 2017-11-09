import React from 'react';
import Service from '../components/Service';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { connect } from 'react-redux';
import { getServiceTypes } from '../actions/service.action.js';

class ServiceContainer extends React.Component {
	constructor() {
		super();
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);
	}

	componentDidMount = () => {
		const { getServiceTypes } = this.props;

		getServiceTypes();
	}

	//	#1
	//	A temporary function to manually add a path props
	//	to each service. Should be dismissed when Backend
	//	provides this to each object item.
	addPathPropToTypes = () => {
		this.props.serviceTypes.map((type, i) => {
			return type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}

	render() {
		const {
			member,
			accessToken
		} = this.props;

		//	See #1
		if(this.props.service.isLoaded) {
			this.addPathPropToTypes();
		}

		console.log(member);

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

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(ownProps);

	const { accessToken } = ownProps;

	return {
		getServiceTypes: () => dispatch(getServiceTypes(accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContainer);
