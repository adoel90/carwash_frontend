import React, { Component } from 'react';
import { CashierNewCardConfirmation, CashierNewCardInstruction } from '../Cashier';

import { PageBlock, PageBlockGroup } from '../Page';
import { CashierNewCardForm } from '../Cashier';
import { Button } from '../Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import NumberFormat from 'react-number-format';

class CashierNewCard extends Component {


	render() {
		const {
			member
		} = this.props

		return (
			<div className="inner-view">
				<PageBlockGroup>
					<PageBlock extension>
						<h3 className="fw-semibold">Pendaftaran Kartu Baru</h3>
						<p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p>
					</PageBlock>
					<PageBlock className="margin-bottom-base">
						<CashierNewCardForm {...this.props} />
					</PageBlock>
				</PageBlockGroup>
				<CashierNewCardConfirmation {...this.props} />
				{/* <CashierNewCardInstruction {...this.props} /> */}
			</div>
		);
	}
		
}

export default CashierNewCard;
