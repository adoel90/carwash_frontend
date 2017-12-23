import React, { Component } from 'react';
import { ProfileTransaction } from '../components/Profile';

class ProfileTransactionContainer extends Component {
	render() {
		return (
			<ProfileTransaction
				{...this.state}
				{...this.props}
			/>
		);
	}
}

export default ProfileTransactionContainer;
