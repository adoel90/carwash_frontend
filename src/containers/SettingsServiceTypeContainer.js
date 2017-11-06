import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServiceList } from '../actions/service.action';
import { ServiceServiceType } from '../components/Settings/SettingsServiceType';

class SettingsServiceTypeContainer extends Component {
	render() {
		return <SettingsServiceType {...this.props} {...this.state} />
	}
}

const mapStateToProps = (state) => {
	return {
		service: state.service
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { type, accessToken } = ownProps;

	return {
		getServiceList: () => dispatch(getServiceList(type, accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsServiceTypeContainer);
