import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Container, Row } from '../Grid';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import CashierTopUpForm from './CashierTopUpForm';
import { Input, InputGroup, InputCurrency, Label } from '../Input';

class CashierTopUp extends Component {
	render() {
		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Isi Ulang Saldo</h5>
					{/* <p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p> */}
				</div>
				<PageBlock className="margin-bottom-5">
					<Row className="flex flex-row align-items--center">
						<div className="column-3">
							<img src={CardIcon} />
						</div>
						<div className="column-9">
							<div className="padding-bottom-2">
								<h5 className="fw-semibold">Gesek kartu member pada Card Reader setelah itu isi saldo sesuai permintaan customer.</h5>
							</div>
							<CashierTopUpForm {...this.props} />
						</div>
					</Row>
				</PageBlock>
			</div>
		);
	}

}

export default CashierTopUp;
