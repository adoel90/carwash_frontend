import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Container, Row } from '../Grid';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { PageBlock } from '../Page';
import { Button } from '../Button';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../assets/icons/Business/credit-card-4.svg';
import Currency from '../Currency';
import NumberFormat from 'react-number-format';


import CashierTopUpForm from './CashierTopUpForm';

class CashierTopUp extends Component {
	constructor() {
		super();
		this.renderTopupModal = this.renderTopupModal.bind(this);
	}

	renderTopupModal = () => {
		const {
			member,
			toggleModal,
			isModalOpen,
			topupData,
			handleTopupSubmit,
			handleInputChange
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.topup}
				toggle={() => toggleModal('topup')}>
				<Form onSubmit={handleTopupSubmit}>
					<ModalHeader>
						<h6 className="fw-semibold ta-center">Isi Ulang Saldo Customer</h6>
					</ModalHeader>
					<ModalContent>
						<Row className="flex align-items--center">
							<div className="column-3 flex flex-column align-items--center">
								<img src={CardIcon} />
							</div>
							<div className="column-9">
								<div className="padding-bottom-3">
									<h4 className="fw-semibold clr-primary">{member.data.name}</h4>
									<h5 className="fw-semibold">
										<NumberFormat
											displayType={'text'}
											format="#### #### #### ####"
											value={member.data.card.id}
										/>
									</h5>
									<p>{member.data.email}</p>
									<p>{member.data.address}</p>
								</div>
							</div>
						</Row>
						<FormGroup row>
							<Label className="fw-semibold">Saldo saat ini</Label>
							<InputGroup>
								<InputAddon>
									<small className="tt-uppercase fw-semibold ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									value={member.data.balance}
									readOnly="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label className="fw-semibold">Tambah Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="tt-uppercase fw-semibold ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									name="balance"
									type="text"
									placeholder="Masukkan jumlah saldo yang diinginkan"
									onChange={(e) => handleInputChange(topupData, e)}
									autoFocus="true"
									required="required"
								/>
							</InputGroup>
						</FormGroup>
						{/* <FormGroup row>
							<Label className="fw-semibold">Pilih Metode Pembayaran</Label>
							<Input
								type="select"
								value={(e) => handleInputChange(topupData, e)}
								onChange={(e) => handleInputChange(topupData, e)}>
								<option value={1}>Cash</option>
								<option value={2}>Debit</option>
								<option value={3}>Kredit</option>
							</Input>
						</FormGroup> */}
					</ModalContent>
					<ModalFooter>
						<Button buttonTheme="primary" buttonFull className="clr-light">
							<small className="tt-uppercase fw-semibold ls-base">Selesai & Print Struk</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

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
						<p className="clr-passive">Isi ulang saldo customer disini dengan mengikuti instruksi yang telah disediakan.</p>
					</Row>
					<Row className="flex flex-row justify-content--center">
						<div className="column-6">
							<CashierTopUpForm {...this.props} />
						</div>
					</Row>
				</PageBlock>
				{member.isAuthenticated ? this.renderTopupModal() : null}
			</div>
		);
	}

}

export default CashierTopUp;
