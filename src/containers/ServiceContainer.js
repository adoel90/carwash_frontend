import React from 'react';
import { connect } from 'react-redux';
import Service from '../components/Service';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { getServiceTypes } from '../actions/service.action.js';

class ServiceContainer extends React.Component {
	constructor() {
		super();
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);
	}

	componentDidMount = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getServiceTypes(accessToken));

	}

	//	#1
	//	A temporary function to manually add a path props
	//	to each service. Should be dismissed when Backend
	//	provides this to each object item.
	addPathPropToTypes = () => {
		const {
			service
		} = this.props;

		service.types.map((type, i) => {
			return type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}

	render() {
		const {
			member,
			service,
			accessToken
		} = this.props;

		if(service.isLoaded) {
			this.addPathPropToTypes();
		}


		return service.isLoaded
		? <Service {...this.state} {...this.props} />
		: null
	}
}

const mapStateToProps = (state, props) => {
	return {
		dialog: state.dialog,
		service: state.service
	}
}

export default connect(mapStateToProps)(ServiceContainer);
