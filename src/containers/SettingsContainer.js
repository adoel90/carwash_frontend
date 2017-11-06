import React, { Component } from 'react';
import {
	Settings,
	SettingsMember,
	SettingsCard,
	SettingsService,
	SettingsCafe
} from '../components/Settings';

import SettingsServiceContainer from './SettingsServiceContainer';


class SettingsContainer extends Component {
	constructor() {
		super();
		this.state = {
			subroutes: [
				{ id: 1, name: 'Pengaturan Member', component: SettingsMember },
				{ id: 2, name: 'Pengaturan Kartu', component: SettingsCard },
				{ id: 3, name: 'Pengaturan Service', component: SettingsServiceContainer },
				{ id: 4, name: 'Pengaturan Cafe', component: SettingsCafe }
			]
		}
	}

	render() {
		return (
			<Settings {...this.state} {...this.props} />
		);
	}

}

export default SettingsContainer;
