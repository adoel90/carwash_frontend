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
import { CashierTopUpConfirmation } from '../Cashier';
import CashierTopUpForm from './CashierTopUpForm';


class CashierTopUp extends Component {
	
	render() {
		return (
			<div className="inner-view">
				<PageBlock className="margin-bottom-5 ta-center">
					<img src={CardIcon} style={{width: '150px'}}/>
					<Row className="flex flex-column padding-bottom-3">
						<h5 className="fw-semibold">Isi Ulang Saldo</h5>
						<p className="clr-passive">Silahkan gesek kartu member untuk mengisi saldo customer pada kolom berikut.</p>
					</Row>
					<CashierTopUpForm {...this.props} handleInputChange={this.props.handleInputChange} />
				</PageBlock>
				<CashierTopUpConfirmation {...this.props} />
			</div>
		);
	}

}

export default CashierTopUp;
