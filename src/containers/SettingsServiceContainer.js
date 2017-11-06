import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes } from '../actions/service.action';
import { SettingsService } from '../components/Settings';

class SettingsServiceContainer extends Component {
	componentDidMount = () => {
		this.props.getServiceTypes();
	}

	render() {
		return <SettingsService {...this.props} {...this.state} />
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { accessToken } = ownProps;

	return {
		getServiceTypes: () => dispatch(getServiceTypes(accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsServiceContainer);
