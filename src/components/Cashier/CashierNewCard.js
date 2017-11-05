import React, { Component } from 'react';

import { PageBlock } from '../Page';
import { CashierNewCardForm } from '../Cashier';

class CashierNewCard extends Component {
	render() {
		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Pendaftaran Kartu Baru</h5>
					<p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p>
				</div>
				<PageBlock className="margin-bottom-5">
					<CashierNewCardForm {...this.props} />
				</PageBlock>
			</div>
		);
	}

}

export default CashierNewCard;
