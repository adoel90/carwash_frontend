import React, { Component } from 'react';
import { PageBlock, PageBlockGroup } from '../Page';
import { TableSet } from '../Table';
import { SettingsServiceList } from '../Settings';

class SettingsServiceType extends Component {
	render() {
		const {
			service
		} = this.props;

		return (
			<PageBlockGroup>
				<PageBlock>
					{ service.isLoaded ? <SettingsServiceList {...this.props} /> : null }
				</PageBlock>
				<PageBlock extension>
				</PageBlock>
			</PageBlockGroup>
		);
	}

}

export default SettingsServiceType;
