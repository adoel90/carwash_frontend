import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllAccess } from '../actions/access.action';

import { SettingsAccess } from '../components/Settings';

class SettingsAccessContainer extends Component {
	constructor() {
		super();
		this.getAllAccess = this.getAllAccess.bind(this);
	}

	componentDidMount = () => {
		this.getAllAccess();
	}

	getAllAccess = () => {
		const { 
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllAccess(accessToken));
	}

	render() {
		return (
			<SettingsAccess
				{...this.state}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		access: state.access
	}
}

export default connect(mapStateToProps)(SettingsAccessContainer);
