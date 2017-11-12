import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes } from '../actions/service.action';
import { SettingsService } from '../components/Settings';

class SettingsServiceContainer extends Component {
	constructor() {
		super();
		this.state = {
			isModalOpen: false
		}

		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount = () => {
		this.props.getServiceTypes();
	}

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		})
	}

	render() {
		return (
			<SettingsService
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
			/>
		)
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
