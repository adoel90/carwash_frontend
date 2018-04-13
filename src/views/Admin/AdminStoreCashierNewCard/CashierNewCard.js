import React, { Component } from 'react';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { PageBlock, PageBlockGroup } from '../../../components/Page';
import { CashierNewCardForm } from '../AdminStoreCashierNewCard';
import { Button } from '../../../components/Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label } from '../../../components/Input';
import NumberFormat from 'react-number-format';
// import { CashierNewCardPaymentReceipt, CashierNewCardConfirmation, CashierNewCardInstruction  } from '../AdminStoreCashierNewCard';
import { CashierNewCardConfirmation, CashierNewCardInstruction  } from '../AdminStoreCashierNewCard';


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
				{/* <CashierNewCardPaymentReceipt {...this.props} /> */}
			</div>
		);
	}
		
}

export default CashierNewCard;
