import React, { Component } from 'react';
import {
	Settings,
	SettingsMember,
	SettingsCard,
	SettingsService,
	SettingsCafe
} from '../components/Settings';

import SettingsServiceContainer from './SettingsServiceContainer';
import SettingsCafeContainer from './SettingsCafeContainer';


class SettingsContainer extends Component {
	constructor() {
		super();
		this.state = {
			subroutes: [
				{ id: 1, name: 'Pengaturan Member', component: SettingsMember },
				{ id: 2, name: 'Pengaturan Service', component: SettingsServiceContainer },
				{ id: 3, name: 'Pengaturan Cafe', component: SettingsCafeContainer }
			]
		}
	}

	render() {
		return <Settings {...this.state} {...this.props} />
	}

}

export default SettingsContainer;
