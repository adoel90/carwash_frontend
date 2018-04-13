import React, { Component } from 'react';
import { ModalHeader, ModalContent, ModalFooter, Modal} from '../../../components/Modal';
import { Container, Row } from '../../../layouts/Grid';
import { Form, FormGroup } from '../../../components/Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../../../components/Input';
import { PageBlock } from '../../../components/Page';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../../assets/icons/Business/credit-card-4.svg';
import Currency from '../../../components/Currency';
import NumberFormat from 'react-number-format';
// import {CashierTopUpPaymentReceipt, CashierTopUpConfirmation, CashierTopUpPaymentCheckout } from '../Cashier';
import {CashierTopUpConfirmation, CashierTopUpPaymentCheckout, CashierTopUpPaymentReceipt } from '../AdminStoreCashierTopUp';
import CashierTopUpForm from './CashierTopUpForm';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

class CashierTopUp extends Component {

	render() {

		return (
			<div className="inner-view">
				<Panel className="ta-center">
					<PanelBody>
						<img src={CardIcon} style={{width: '150px'}}/>
						<Row className="flex flex-column padding-bottom-small">
							<h3 className="fw-semibold">Isi Ulang Saldo</h3>
							<p className="clr-dark-light">Silahkan gesek kartu member untuk mengisi saldo customer pada kolom berikut.</p><br />
						</Row>
						
						<CashierTopUpForm {...this.props} handleInputChange={this.props.handleInputChange} />
					</PanelBody>
				</Panel>
				<CashierTopUpConfirmation {...this.props} />
				<CashierTopUpPaymentCheckout { ...this.props} />
				<CashierTopUpPaymentReceipt {...this.props} />
			</div>
		);
	}
}

export default CashierTopUp;
