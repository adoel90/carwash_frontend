import React, { Component } from 'react';
// import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter, Modal} from '../../components/Modal';
// import { Container, Row } from '../Grid';
import { Container, Row } from '../../layouts/Grid';
import { Form, FormGroup } from '../../components/Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../../components/Input';
import { PageBlock } from '../Page';
import { Button } from '../Button';
import { Alert } from '../../components/Alert';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../assets/icons/Business/credit-card-4.svg';
import Currency from '../Currency';
import NumberFormat from 'react-number-format';
import { CashierRefundConfirmation } from '../Cashier';
import CashierRefundForm from './CashierRefundForm';


class CashierRefundFirst extends Component {
	
	render() {
		return (
			<div className="inner-view">
                <PageBlock extension>
					<h3 className="fw-semibold">Refund Kartu</h3>
					<p className="clr-passive">Harap gesek kartu atau masukkan ID kartu member yang ingin direfund pada kolom yang telah tersedia.</p>
				</PageBlock>
				<PageBlock className="margin-bottom-5 ta-center">

					<CashierRefundForm {...this.props} handleInputChange={this.props.handleInputChange} />
				</PageBlock>
				<CashierRefundConfirmation {...this.props} />
			</div>
		);
	}
}

export default CashierRefundFirst;