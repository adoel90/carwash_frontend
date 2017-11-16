import React, { Component } from 'react';
import { PageBlock, PageBlockGroup } from '../Page';
import { TableSet } from '../Table';
import { SettingsServiceList } from '../Settings';
import { Button } from '../Button';

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
				<PageBlock className="flex justify-content--flex-end" extension>
					<Button buttonTheme="primary" className="clr-light">
						<small className="fw-semibold tt-uppercase ls-base">Buat Service Baru</small>
					</Button>
				</PageBlock>
			</PageBlockGroup>
		);
	}

}

export default SettingsServiceType;
