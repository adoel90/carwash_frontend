import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServiceList } from '../actions/service.action';
import { SettingsServiceType } from '../components/Settings';

class SettingsServiceTypeContainer extends Component {
	componentDidMount = () => {
		this.props.getServiceList();
	}

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

	const requiredData = {
		type: type.id,
		limit: 10,
		offset: 0
	}

	return {
		getServiceList: () => dispatch(getServiceList(requiredData, accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsServiceTypeContainer);
