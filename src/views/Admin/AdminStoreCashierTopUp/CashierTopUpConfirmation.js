import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Column } from '../../../layouts/Grid';
import { ModalHeader, ModalContent, ModalFooter, Modal, ModalDialog, ModalBody} from '../../../components/Modal';
import {FormGroup } from '../../../components/Form';
import { FormField, Form } from '../../../layouts/Form';
// import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Input, InputGroup, InputAddon, InputCurrency, Label, InputCashier } from '../../../components/Input';
import { PageBlock } from '../../../components/Page';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
// import { Row } from '../Grid';
import { Container, Row } from '../../../layouts/Grid';
import { Badge } from '../../../components/Badge';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../../assets/icons/Business/credit-card-4.svg';
import Currency from '../../../components/Currency';
import NumberFormat from 'react-number-format';

class CashierTopUpConfirmation extends Component {

	//#
	renderTambahSaldoCommon = () => {
		const { topupData,handleInputChange } = this.props;

		return (
				<InputGroup>
					<InputAddon>
						<small className="tt-uppercase fw-semibold ls-base">Rp</small>
					</InputAddon>
					<InputCurrency
						className="input"
						name="balance"
						type="text"
						placeholder="Masukkan jumlah saldo yang diinginkan"
						onChange={(e) => handleInputChange(topupData, e)}
						autoFocus="true"
						required="required"
					/>
				</InputGroup>
			)
	}

	//#
	renderTambahSaldoForTaxiOnline = () => {

		const { bonus, handleInputChange, topupData, handleTierTopup } = this.props;

		return (
			<div>
				<div className="flex justify-content--space-around">
					{console.log(this.props.bonus)}
					{
						this.props.bonus.map((tier) => {
							return (
								<Button className="padding-large" type="button" theme="primary" key={tier.id} value={tier} onClick={(e) => handleTierTopup(tier, e)}>
									<h5>Rp. {parseFloat(tier.price).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}</h5>
								</Button>
							);
						})
					}
				</div>
			</div>
		)
	};

	renderDialog = () => {
		const {
			dialog,
			dispatch,
			toggleDialog,
			isDialogOpen
		} = this.props;

		return (

			<ModalDialog
				isOpen={dialog.isOpened}
				toggle={toggleDialog}
				type={dialog.data.type}
				title={dialog.data.title}
				message={dialog.data.message}
				onConfirm={dialog.data.onConfirm}
				onClose={dialog.data.onClose}
				confirmText={dialog.data.confirmText}
				closeText={dialog.data.closeText}
			/>
		)
	}

	render() {
		
		const {
			authenticatedMember,
			paymentMethod,
			isModalOpen,
			toggleModal,
			topupData,
			handleTopupSubmit,
			handleInputChange,
			handleTopUpPaymentCheckout
		} = this.props;

		const typeMember = authenticatedMember.isAuthenticated ? authenticatedMember.data.card.type.name : null;

		const renderMemberInformation = () => {
			return (
				<div className="padding-bottom-small">	
					<h4 className="fw-semibold clr-primary">{authenticatedMember.data.name}</h4>
					<h5 className="fw-semibold">
						{/* <NumberFormat
							displayType={'text'}
							format="#### #### #### ####"
							value={authenticatedMember.data.card ? authenticatedMember.data.card.id : null}
						/> */}
					</h5>
					<Badge theme="secondary" className="margin-top-small">
						<small className="fw-semibold tt-uppercase ls-base">{authenticatedMember.data.card ? authenticatedMember.data.card.type.name : null}</small><br />
					</Badge>
				</div>
			)
		}

		return (
			<Modal
				isOpen={isModalOpen.topup}>
				<Form onSubmit={handleTopupSubmit}>
				{/* <Form onSubmit={handleTopUpPaymentCheckout}> */}
					<ModalHeader>
						<h5 className="fw-bold ta-center">Isi Ulang Saldo Customer</h5>
					</ModalHeader>
					<ModalBody>
						<div className="ta-center">
							{renderMemberInformation()}
						</div><br />
						<FormGroup row>
							<FormField label="Jumlah Top Up">
								{/* <Label className="fw-semibold">Saldo saat ini</Label> */}
								<InputGroup>
									<InputAddon>
										<small className="tt-uppercase fw-semibold ls-base">Rp</small>
									</InputAddon>
									{console.log(authenticatedMember)}
									<InputCurrency
										className="input"
										value={authenticatedMember.data.card ? authenticatedMember.data.card.type.min : null}
										readOnly="true"
									/>
								</InputGroup>
							</FormField>
						</FormGroup>
						<FormGroup row>
							<FormField label="Bonus">
								<InputGroup>
									<InputAddon>
										<small className="tt-uppercase fw-semibold ls-base">Rp</small>
									</InputAddon>
									<InputCurrency
										className="input"
										value={authenticatedMember.data.card ? authenticatedMember.data.card.type.bonus : null}
										readOnly="true"
									/>
								</InputGroup>
							</FormField>
						</FormGroup>

						<FormGroup row>
							<FormField label="Metode Pembayaran">
								<InputCashier
									className="input"
									name="payment"
									type="select"
									onChange={(e) => handleInputChange(topupData, e)}
									required="true"
									value={topupData.payment}>
										<option selected="true" disabled="true">Pilih metode pembayaran</option>
										{ 
											this.props.paymentMethod.map((method) => {
												return <option value={method.id}>{method.name}</option>
											})
										}
								</InputCashier>
							</FormField>
						</FormGroup>
						

						{/* TAMBAH SALDO TAXI ONLINE & UMUM */}
						<FormGroup row>
							<FormField label="Tambah Saldo">
							{ typeMember === "Taxi Online" ? this.renderTambahSaldoForTaxiOnline() : this.renderTambahSaldoCommon()}
							</FormField>
						</FormGroup>
					</ModalBody>

					<ModalFooter className="flex justify-content--center">
						<Button type="button" theme="danger" className="margin-right-small" onClick={() => toggleModal('topup')}>
							<small className="tt-uppercase fw-semibold ls-base">Kembali</small>
						</Button>
						{/* {
							typeMember !== "Taxi Online" ?
								<Button type="submit" theme="primary" className="clr-light margin-left-small">
									<small className="tt-uppercase fw-semibold ls-base">Isi Saldo</small>
								</Button>
							: null
						} */}

						{
							typeMember !== "Taxi Online" ?
								<Button theme="primary" className="clr-light margin-left-small">
									<small className="tt-uppercase fw-semibold ls-base">Isi Saldo</small>
								</Button>
							: null
						}


					</ModalFooter>
				</Form>
				
				<Column md={12}>
					{ this.renderDialog() }
				</Column>
			</Modal>

			
		)
	}
}

export default CashierTopUpConfirmation;
// export default connect( mapStateToProps, mapDispatchToProps )(CashierTopUpConfirmation);