import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProfileAccount } from '../../../components/Profile';

class ProfileAccountContainer extends Component {
	render() {
		return (
			<ProfileAccount
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default ProfileAccountContainer;