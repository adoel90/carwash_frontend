import React, { Component } from 'react';

import { SettingsAccessList, SettingsUpdateAccess, SettingsCreateAccess } from '../Settings';
import { PageBlockGroup, PageBlock } from '../Page';
import { Button } from '../Button';

class SettingsAccess extends Component {
	render() {
		const {
			access,
			accessList,
			handleCreateAccess
		} = this.props;

		const renderAccessList = () => {
			if(accessList.isFetching) {
				return <p>Sedang memuat data akses level. Tunggu sebentar...</p>
			}

			if(accessList.isLoaded) {
				return <SettingsAccessList {...this.props} />
			}
		}

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h4 className="fw-semibold">Daftar Akses</h4>
				</div>
				<PageBlockGroup>
					<PageBlock>
						{ renderAccessList() }
					</PageBlock>
					<PageBlock extension className="flex justify-content--flex-end">
						<Button buttonTheme="primary" className="clr-light" onClick={handleCreateAccess}>
							<small className="fw-semibold tt-uppercase ls-base">Tambah Akses Level</small>
						</Button>
					</PageBlock>
				</PageBlockGroup>
				<SettingsUpdateAccess {...this.props} />
				<SettingsCreateAccess {...this.props} />
			</div>
		);
	}
}

export default SettingsAccess;
