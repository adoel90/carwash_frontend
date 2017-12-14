import React, { Component } from 'react';
import { SettingsUserList } from '../Settings';

class SettingsUser extends Component {
	render() {
		const {
			user,
			userList
		} = this.props;
		
		const renderUserList = () => {
			if(userList.isFetching) {
				return <p>Tunggu sebentar, data user sedang dimuat...</p>
			}
			
			if(userList.isLoaded) {
				return <SettingsUserList {...this.props} />
			}
		}
		
		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h4 className="fw-semibold">Daftar User</h4>
				</div>
				{ renderUserList() }
			</div>
		);
	}

}

export default SettingsUser;
