import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewMember } from '../../actions/member.action';

import { Form, FormGroup} from '../Form';
import { FormField } from '../../layouts/Form';
// import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { InputCashier, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../../layouts/Grid';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { Column } from '../../layouts/Grid';


class CashierNewCardForm extends Component {
	constructor() {
		super();
		this.renderCardTypeOptions = this.renderCardTypeOptions.bind(this);
	}

	renderCardTypeOptions = (type, i) => {
		if(type.status) {
			return <option value={type.id}>{type.name}</option>
		}
	}

	render() {
		const {
			card,
			cardTypes,
			member,
			newCardData,
			paymentMethod,
			selectedCardType,
			handleInputChange,
			handleChangeCardType,
			handleNewCardSubmit
		} = this.props;

		return (
			<Form onSubmit={handleNewCardSubmit}>
				<Row className="margin-bottom-small">
					<Column md={6}>
					{ !selectedCardType.refund
						? <div className="column-6">
							<FormGroup>
								<FormField label="Nama Lengkap">
									<InputGroup>
										<InputAddon>
											<i className="far fa-user"></i>
										</InputAddon>
										<InputCashier
											className="input"
											name="name"
											type="text"
											placeholder="e.g: John Doe, Billy Simpson"
											onChange={(e) => handleInputChange(newCardData, e)}
											required="true"
										/>
									</InputGroup>
								</FormField>
							</FormGroup>
							<FormGroup>
								<FormField label="Alamat E-mail">
									<InputGroup>
										<InputAddon>
											<i className="far fa-envelope"></i>
										</InputAddon>
										<InputCashier
											className="input"
											name="email"
											type="email"
											placeholder="e.g: john.doe@email.com"
											onChange={(e) => handleInputChange(newCardData, e)}
										/>
									</InputGroup>
								</FormField>
							</FormGroup>
							<FormGroup>
								<FormField label="Nomor Telepon">
									<InputGroup>
										<InputAddon>
											<i className="fas fa-phone"></i>
										</InputAddon>
										<InputCashier
											className="input"
											name="phone"
											type="text"
											placeholder="+62"
											onChange={(e) => handleInputChange(newCardData, e)}
											required="true"
										/>
									</InputGroup>
								</FormField>
							</FormGroup>
							<FormGroup>
								<FormField label="Alamat">
									<InputCashier
										className="input"
										name="address"
										type="textarea"
										placeholder="Provinsi, Kecamatan, Jalan, Kode Pos"
										onChange={(e) => handleInputChange(newCardData, e)}
										required="true"
									/>
								</FormField>
							</FormGroup>
						</div>
						: null
					}
					</Column>
					<Column md={6}>
						<FormGroup>
							<FormField label="Tipe Kartu">
								<InputCashier
									className="input"
									name="card"
									type="select"
									defaultValue={newCardData.card}
									// onChange={(e) => handleInputChange(newCardData, e)}>
									onChange={(e) => handleChangeCardType(e)}>
									{card.types.isLoaded ? card.types.data.data.result.map(this.renderCardTypeOptions) : null}
								</InputCashier>
							</FormField>
						</FormGroup>
						
						<FormGroup>
							<FormField label="Metode Pembayaran">
								<InputCashier
									className="input"
									name="payment"
									type="select"
									onChange={(e) => handleInputChange(newCardData, e)}
									deafultValue={newCardData.payment}>
									{
										paymentMethod.map((method) => {
											return <option value={method.id}>{method.name}</option>
										})
									}
								</InputCashier>
								<small className="clr-dark-light">Merupakan metode pembayaran yang dipilih calon member untuk pembuatan kartu.</small>
							</FormField>
						</FormGroup>

						<FormGroup>
							<FormField label="Saldo Awal">
								<InputGroup>
									<InputAddon>
										<small className="fw-semibold tt-uppercase ls-base">RP</small>
									</InputAddon>
									<InputCurrency
										className="input"
										name="starting"
										type="text"
										value={selectedCardType.min}
										readOnly
									/>
								</InputGroup>
								<small className="clr-dark-light">Merupakan minimal saldo yang harus diisi calon member untuk pembuatan kartu.</small>
							</FormField>
						</FormGroup>
					</Column>

				</Row>
				<div className="flex justify-content--flex-end">
					<Button buttonTheme="primary" type="submit" className="clr-light">
						<small className="fw-semibold tt-uppercase ls-base">Selanjutnya</small>
					</Button>
				</div>
			</Form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}
export default connect(mapStateToProps)(CashierNewCardForm);
