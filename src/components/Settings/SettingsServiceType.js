import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Table } from 'reactstrap';

class SettingsServiceType extends Component {

	render() {
		const {
			service
		} = this.props;

		return (
			<PageBlock>
				<Table>
					<thead>
						<tr>
							<th>Nama Menu</th>
							<th>Harga</th>
							<th>Deskripsi</th>
							<th>Action</th>
						</tr>
					</thead>
				</Table>
			</PageBlock>
		)
	}

}

export default SettingsServiceType;
