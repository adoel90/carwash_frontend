import React, { Component } from 'react';
import { CashierTopUpConfirmation } from '../Cashier';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Container, Row } from '../Grid';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { PageBlock } from '../Page';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../assets/icons/Business/credit-card-4.svg';
import Currency from '../Currency';
import NumberFormat from 'react-number-format';

import CashierTopUpForm from './CashierTopUpForm';

class CashierTopUp extends Component {

	render() {
		const {
			member
		} = this.props;

		return (
			<div className="inner-view">
				<PageBlock className="margin-bottom-5 ta-center">
					<img src={CardIcon} style={{width: '150px'}}/>
					<Row className="flex flex-column padding-bottom-3">
						<h5 className="fw-semibold">Isi Ulang Saldo</h5>
						<p className="clr-passive">Silahkan gesek kartu member untuk mengisi saldo customer pada kolom berikut.</p>
					</Row>
					<CashierTopUpForm {...this.props} />
				</PageBlock>
				<CashierTopUpConfirmation {...this.props} />
			</div>
		);
	}

}

export default CashierTopUp;
