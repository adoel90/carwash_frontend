import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewMember } from '../../../actions/member.action';

import { Form, FormGroup} from '../../../components/Form';
import { FormField } from '../../../layouts/Form';
import { InputCashier, Input, InputGroup, InputAddon, InputCurrency, Label, Select, Textarea } from '../../../components/Input';
import { Row, Column } from '../../../layouts/Grid';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';


class CashierNewCardForm extends Component {

	constructor() {
		super();
		this.renderCardTypeOptions = this.renderCardTypeOptions.bind(this);
	};

	renderCardTypeOptions = (type, i) => {

		if(type.status) {
			return <option value={type.id}>{type.name}</option>
		}
	};

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
			handleNewCardSubmit,
			handleNewCardConfirmationSubmit
		} = this.props;

		return (
			<Form onSubmit={handleNewCardConfirmationSubmit}>
			{/* <Form onSubmit={handleNewCardConfirmationSubmit}> */}
				<Row className="margin-bottom-small">
					{console.log(newCardData)}


					{ newCardData.card === 15 || newCardData.card === 1 ?
							<Column md={6}>
								<div className="column-6">
									<FormGroup>
										<FormField label="Nama Lengkap">
											<InputGroup>
												<InputAddon>
													<i className="far fa-user"></i>
												</InputAddon>
												<Input
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
												<Input
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
												<Input
													name="phone"
													type="text"
													placeholder="+62"
													onChange={(e) => handleInputChange(newCardData, e)}
													// required="false"
												/>
											</InputGroup>
										</FormField>
									</FormGroup>
									<FormGroup>
										<FormField label="Alamat">
											<Textarea
												name="address"
												type="textarea"
												placeholder="Provinsi, Kecamatan, Jalan, Kode Pos"
												onChange={(e) => handleInputChange(newCardData, e)}
												// required="false"
											/>
										</FormField>
									</FormGroup>
								</div>
							</Column>
						: null
					}
					<Column md={6}>
						<FormGroup>
							<FormField label="Tipe Kartu">
								<Select
									name="card"
									type="select"
									defaultValue={newCardData.card}
									// onChange={(e) => handleInputChange(newCardData, e)}>
									onChange={(e) => handleChangeCardType(e)}>
									{card.types.isLoaded ? cardTypes.map(this.renderCardTypeOptions) : null}
								</Select>
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField label="Saldo Awal">
								<InputGroup>
									<InputAddon>
										<small className="fw-semibold tt-uppercase ls-base">RP</small>
									</InputAddon>
									<InputCurrency
										name="starting"
										type="text"
										className="input"
										value={selectedCardType.min}
										readOnly
									/>
								</InputGroup>
								<small className="clr-dark-light">Merupakan minimal saldo yang harus diisi calon member untuk pembuatan kartu.</small>
							</FormField>
						</FormGroup>
						<FormGroup>
							<FormField label="Metode Pembayaran">
								<Select
									name="payment"
									type="select"
									onChange={(e) => handleInputChange(newCardData, e)}
									deafultValue={newCardData.payment}>
									{
										paymentMethod.map((method) => {
											return <option value={method.id}>{method.name}</option>
										})
									}
								</Select>
								<small className="clr-dark-light">Merupakan metode pembayaran yang dipilih calon member untuk pembuatan kartu.</small>
							</FormField>
						</FormGroup>
					</Column>

				</Row>
				<div className="flex justify-content--center">
					<Button theme="primary" type="submit" className="clr-light">
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
