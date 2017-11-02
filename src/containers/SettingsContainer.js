import React, { Component } from 'react';
import { Settings } from '../components/Settings';

class SettingsContainer extends Component {
	render() {
		return (
			<Settings {...this.state} {...this.props} />
		);
	}

}

export default SettingsContainer;
