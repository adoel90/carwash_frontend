import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewMember } from '../../actions/member.action';

import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';


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
			selectedCardType,
			handleInputChange,
			handleChangeCardType,
			handleNewCardSubmit
		} = this.props;

		return (
			<Form onSubmit={handleNewCardSubmit}>
				<Row className="margin-bottom-3">
					<div className="column-6">
						<FormGroup>
							<Label htmlFor="fullname">
								<p className="fw-semibold">Nama Lengkap</p>
							</Label>
							<InputGroup>
								<InputAddon>
									<i className="ion-person"></i>
								</InputAddon>
								<Input
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
								<Input
									name="email"
									type="email"
									placeholder="e.g: john.doe@email.com"
									onChange={(e) => handleInputChange(newCardData, e)}
									required="true"
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
								<Input
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
							<Input
								name="address"
								type="textarea"
								placeholder="Provinsi, Kecamatan, Jalan, Kode Pos"
								onChange={(e) => handleInputChange(newCardData, e)}
								required="true"
							/>
						</FormGroup>
					</div>
					<div className="column-6">
						<FormGroup>
							<Label htmlFor="card">
								<p className="fw-semibold">Tipe Kartu</p>
							</Label>
							<Input
								name="card"
								type="select"
								defaultValue={newCardData.card}
								// onChange={(e) => handleInputChange(newCardData, e)}>
								onChange={(e) => handleChangeCardType(e)}>
								{card.types.isLoaded ? cardTypes.map(this.renderCardTypeOptions) : null}
							</Input>
						</FormGroup>
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
							<small className="clr-passive">Merupakan minimal saldo yang harus diisi calon member untuk membuat kartu baru.</small>
						</FormGroup>
					</div>
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
