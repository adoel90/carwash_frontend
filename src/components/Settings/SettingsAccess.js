import React, { Component } from 'react';

import { PageBlockGroup, PageBlock } from '../Page';

class SettingsAccess extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			access
		} = this.props;

		const renderAccessList = () => {
			return null;
		}

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h4 className="fw-semibold">Daftar Akses</h4>
				</div>
				<PageBlock>
					{ renderAccessList() }
				</PageBlock>
			</div>
		);
	}
}

export default SettingsAccess;
