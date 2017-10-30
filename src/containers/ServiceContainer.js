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
		this.handleAccessToken = this.handleAccessToken.bind(this);
		this.state = {
			user: {},
			accessToken: '',
			isAuthenticated: false
		}
	}

	componentWillMount = () => {
		this.handleAccessToken();
	}

	handleAccessToken = () => {
		const { cookies, dispatch } = this.props;
		const token = cookies.get('accessToken') || null;
		const user = cookies.get('user') || null;

		this.setState({
			user: user,
			accessToken: token,
			isAuthenticated: token ? true : false
		})

		dispatch(getServiceTypes(token));
	}

	addPathPropToTypes = () => {
		this.props.serviceTypes.map((type, i) => {
			return type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}

	render() {
		const {
			accessToken
		} = this.props;

		if(this.props.service.isLoaded) {
			this.addPathPropToTypes();
		}

		return this.props.service.isLoaded
		? <Service {...this.state} {...this.props} />
		: null;
	}
}

ServiceContainer.PropTypes = {
	cookies: PropTypes.instanceOf(Cookies).isRequired
}

const mapStateToProps = (state, props) => {
	const service = state.service;
	const serviceTypes = state.service.types;

	return {
		service,
		serviceTypes
	}
}

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	const { accessToken } = ownProps;
//
// 	return {
// 		getServiceTypes: () => dispatch(getServiceTypes(accessToken))
// 	}
// }

export default withCookies(connect(mapStateToProps)(ServiceContainer));
