import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Settings,
	SettingsMember,
	SettingsCard,
	SettingsService,
	SettingsCafe
} from '../components/Settings';

import {
	toggleDialog
} from '../actions/dialog.action';

import SettingsMemberContainer from './SettingsMemberContainer';
import SettingsServiceContainer from './SettingsServiceContainer';
import SettingsCafeContainer from './SettingsCafeContainer';
import SettingsCardContainer from './SettingsCardContainer';

class SettingsContainer extends Component {
	constructor() {
		super();
		this.toggleDialog = this.toggleDialog.bind(this);
		this.state = {
			subroutes: [
				{ id: 1, name: 'Pengaturan Member', path: "/admin/settings/pengaturan-member", component: SettingsMemberContainer },
				{ id: 2, name: 'Pengaturan Service', path: "/admin/settings/pengaturan-service", component: SettingsServiceContainer },
				{ id: 3, name: 'Pengaturan Cafe', path: "/admin/settings/pengaturan-cafe", component: SettingsCafeContainer },
				{ id: 4, name: 'Pengaturan Tipe Kartu', path: "/admin/settings/pengaturan-kartu", component: SettingsCardContainer}
			]
		}
	}

	toggleDialog = () => {
		const {
			dialog,
			dispatch
		} = this.props;

		dispatch(toggleDialog(null, dialog.isOpen))
	}

	render() {
		return (
			<Settings
				{...this.state}
				{...this.props}
				toggleDialog={this.toggleDialog}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(SettingsContainer);
