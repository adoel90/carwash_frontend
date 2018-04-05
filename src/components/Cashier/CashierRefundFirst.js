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
import { Panel, PanelBody, PanelHeader } from '../Panel';

class CashierRefundFirst extends Component {
	
	render() {
		return (
			<div className="inner-view">
				<Panel>
					<PanelHeader>
						<h4 className="fw-bold">Refund Kartu</h4>
						<p className="clr-passive">Harap gesek kartu atau masukkan ID kartu member yang ingin direfund pada kolom yang telah tersedia.</p>
					</PanelHeader>
					<PanelBody>
						<CashierRefundForm {...this.props} handleInputChange={this.props.handleInputChange} />
					</PanelBody>
				</Panel>
				<CashierRefundConfirmation {...this.props} />
			</div>
		);
	}
}

export default CashierRefundFirst;