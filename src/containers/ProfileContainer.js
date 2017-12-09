import React from 'react';
import { Profile } from '../components/Profile';

class ProfileContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			sidenavItems: [
				{ title: 'Informasi Akun', path: '/profile/account' },
				{ title: 'Daftar Transaksi', path: '/profile/transactions' }
			]
		}
	}

	render() {
		return (
			<Profile 
				{...this.state} 
				{...this.props} 
			/>
		)
	}
}

export default ProfileContainer;
