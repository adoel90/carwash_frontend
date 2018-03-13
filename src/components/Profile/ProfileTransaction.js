import React, { Component } from 'react';
import { PageBlockGroup, PageBlock } from '../Page';

class ProfileTransaction extends Component {
	render() {
		return (
			<div className="inner-view">
				<PageBlockGroup>
					<PageBlock extension>
						<h5 className="fw-semibold">Daftar Transaksi</h5>
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