import React, { Component } from 'react';
import { PageBlockGroup, PageBlock } from '../Page';

class ProfileTransaction extends Component {
	render() {
		return (
			<div className="inner-view">
				<PageBlockGroup>
					<PageBlock extension>
						<h3 className="fw-semibold">Daftar Transaksi</h3>
						<p>Berikut daftar transaksi terakhir Anda.</p>
					</PageBlock>
					<PageBlock>
					</PageBlock>
				</PageBlockGroup>
			</div>
		);
	}
}

export default ProfileTransaction;