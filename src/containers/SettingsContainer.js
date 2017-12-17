import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Settings } from '../components/Settings';
// import {
// 	Settings,
// 	SettingsMember,
// 	SettingsUser,
// 	SettingsCard,
// 	SettingsService,
// 	SettingsCafe
// } from '../components/Settings';

import {
	showDialog,
	hideDialog
} from '../actions/dialog.action';

import SettingsMemberContainer from './SettingsMemberContainer';
import SettingsUserContainer from './SettingsUserContainer';
import SettingsServiceContainer from './SettingsServiceContainer';
import SettingsCafeContainer from './SettingsCafeContainer';
import SettingsCardContainer from './SettingsCardContainer';
import SettingsAccessContainer from './SettingsAccessContainer';

class SettingsContainer extends Component {
	constructor() {
		super();
		this.handleAccessLevel = this.handleAccessLevel.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.state = {
			subroutes: {
				default: [
					{ id: 1, name: 'Pengaturan Member', path: "/admin/settings/member-settings", component: SettingsMemberContainer },
					{ id: 3, name: 'Pengaturan Service', path: "/admin/settings/service-settings", component: SettingsServiceContainer },
					{ id: 4, name: 'Pengaturan Cafe', path: "/admin/settings/cafe-settings", component: SettingsCafeContainer },
					{ id: 5, name: 'Pengaturan Tipe Kartu', path: "/admin/settings/card-settings", component: SettingsCardContainer},
				],
				admin: [
					{ id: 1, name: 'Pengaturan User', path: "/admin/settings/user-settings", component: SettingsUserContainer },
					{ id: 2, name: 'Pengaturan Akses', path: "/admin/settings/access-settings", component: SettingsAccessContainer }
				]
			}
		}
	}

	componentDidMount = (prevProps) => {
		this.handleAccessLevel();
	}

	handleAccessLevel = () => {

	}

	toggleDialog = (data) => {
		const {
			dialog,
			dispatch
		} = this.props;

		console.log(data);

		if(!dialog.isOpened) {
			this.showDialog(data);
		}
		else {
			this.hideDialog();
		}
	}

	showDialog = (data) => {
		const { dialog, dispatch } = this.props;

		dispatch(showDialog(data))
	}

	hideDialog = () => {
		const { dialog, dispatch } = this.props;

		dispatch(hideDialog());
	}

	render() {
		return (
			<Settings
				{...this.state}
				{...this.props}
				toggleDialog={this.toggleDialog}
				showDialog={this.showDialog}
				hideDialog={this.hideDialog}
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
