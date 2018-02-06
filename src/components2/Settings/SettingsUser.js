import React, { Component } from 'react';

import { 
	SettingsUserList,
	SettingsUpdateUser,
	SettingsCreateUser
} from '../Settings';
import { PageBlockGroup, PageBlock } from '../Page';
import { Button } from '../Button';

class SettingsUser extends Component {
	render() {
		const {
			user,
			userList,
			handleCreateUser
		} = this.props;
		
		const renderUserList = () => {
			if(userList.isFetching) {
				return <p>Sedang memuat data user. Tunggu sebentar...</p>
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
				<PageBlockGroup>
					<PageBlock>
						{ renderUserList() }
					</PageBlock>
					<PageBlock extension className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="primary" className="clr-light" onClick={handleCreateUser}>
							<small className="fw-semibold tt-uppercase ls-base">Tambah User Baru</small>
						</Button>
					</PageBlock>
				</PageBlockGroup>
				<SettingsUpdateUser {...this.props} />
				<SettingsCreateUser {...this.props} />
			</div>
		);
	}

}

export default SettingsUser;
