import React, { Component } from 'react';
import { CashierNewCardConfirmation, CashierNewCardInstruction } from '../Cashier';
import { Panel, PanelHeader, PanelBody } from '../Panel';
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
				<Panel>
					<PanelHeader>
						<h4 className="fw-bold">Pendaftaran Kartu Baru</h4>
						<p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p>
					</PanelHeader>
					<PanelBody>
						<CashierNewCardForm {...this.props} />
					</PanelBody>
				</Panel>
				<CashierNewCardConfirmation {...this.props} />
				<CashierNewCardInstruction {...this.props} />
			</div>
		);
	}
		
}

export default CashierNewCard;
