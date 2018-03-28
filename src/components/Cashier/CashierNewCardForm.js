import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewMember } from '../../actions/member.action';

import { Form, FormGroup } from '../Form';
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
				<Row className="margin-bottom-3">
				<Column md={4}>
					{ !selectedCardType.refund
						? <div className="column-6">
							<FormGroup>
								<Label htmlFor="fullname">
									<p className="fw-semibold">Nama Lengkap</p>
								</Label>
								<InputGroup>
									<InputAddon>
										<i className="ion-person"></i>
									</InputAddon>
									<InputCashier
										name="name"
										type="text"
										placeholder="e.g: John Doe, Billy Simpson"
										onChange={(e) => handleInputChange(newCardData, e)}
										required="true"
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="email">
									<p className="fw-semibold">Alamat E-mail</p>
								</Label>
								<InputGroup>
									<InputAddon>
										<i className="ion-email"></i>
									</InputAddon>
									<InputCashier
										name="email"
										type="email"
										placeholder="e.g: john.doe@email.com"
										onChange={(e) => handleInputChange(newCardData, e)}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="phone">
									<p className="fw-semibold">Nomor Telepon</p>
								</Label>
								<InputGroup>
									<InputAddon>
										<i className="ion-android-call"></i>
									</InputAddon>
									<InputCashier
										name="phone"
										type="text"
										placeholder="+62"
										onChange={(e) => handleInputChange(newCardData, e)}
										required="true"
									/>

								</InputGroup>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="address">
									<p className="fw-semibold">Alamat</p>
								</Label>
								<InputCashier
									name="address"
									type="textarea"
									placeholder="Provinsi, Kecamatan, Jalan, Kode Pos"
									onChange={(e) => handleInputChange(newCardData, e)}
									required="true"
								/>
							</FormGroup>
						</div>
						: null
					}
					</Column>
					<Column md={8}>
					{/* <div className="column-6"> */}
						<FormGroup>
							<Label htmlFor="card">
								<p className="fw-semibold">Tipe Kartu</p>
							</Label>
							<InputCashier
								name="card"
								type="select"
								defaultValue={newCardData.card}
								// onChange={(e) => handleInputChange(newCardData, e)}>
								onChange={(e) => handleChangeCardType(e)}>
								{card.types.isLoaded ? card.types.data.data.result.map(this.renderCardTypeOptions) : null}
							</InputCashier>
						</FormGroup><br />
						<FormGroup>
							<Label htmlFor="starting">
								<p className="fw-semibold">Saldo Awal</p>
							</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">RP</small>
								</InputAddon>
								<InputCurrency
									name="starting"
									type="text"
									value={selectedCardType.min}
									readOnly
								/>
							</InputGroup>
							<small className="clr-passive">Merupakan minimal saldo yang harus diisi calon member untuk pembuatan kartu.</small>
						</FormGroup><br />
						<FormGroup>
							<Label className="fw-semibold">Metode Pembayaran</Label>
							<InputCashier
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
							<small className="clr-passive">Merupakan metode pembayaran yang dipilih calon member untuk pembuatan kartu.</small>
						</FormGroup>
					{/* </div> */}
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
