import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Column } from '../../../layouts/Grid';
import { ModalHeader, ModalContent, ModalFooter, Modal, ModalDialog, ModalBody} from '../../../components/Modal';
import {FormGroup } from '../../../components/Form';
import { FormField, Form } from '../../../layouts/Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label, InputCashier } from '../../../components/Input';
import { PageBlock } from '../../../components/Page';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { Container, Row } from '../../../layouts/Grid';
import { Badge } from '../../../components/Badge';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../../assets/icons/Business/credit-card-4.svg';
import Currency from '../../../components/Currency';
import NumberFormat from 'react-number-format';

class CashierTopUpConfirmation extends Component {

	//#
	renderTambahSaldoCommon = () => {
		const { topupData,handleInputChange, storeState } = this.props;

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
	renderTambahSaldoMember = () => {

		const { topupData, handleTopUpMember, optionTopUpMember, optionTopUpMemberThemeButton, storeState} = this.props;

		const center ={
			'marginLeft' : '5px'
		};

		//#TO SHOW LOADER WHEN KLIK BUTTON
		// if(optionTopUpMemberThemeButton === true){
		// 	return (
		// 		<div>
		// 			<div className="flex justify-content--space-around">
		// 				<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
		// 			</div>
		// 		</div>
		// 	)
		// };

		if(storeState.saldo.isLoaded){
			return (
				<div>
					<div className="flex justify-content--space-around">
						{
							optionTopUpMember.length ? 
							optionTopUpMember.map((topup) => {
								return (
									<div>
										<Button type="button" theme="primary" key={topup.id} value={topup} onClick={(e) => handleTopUpMember(topup, e)}>
											<h5>Rp. {parseFloat(topup.balance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}</h5>
										</Button>
										<h5><small className="margin-right-small center">Bonus : { topup.bonus }</small></h5>
									</div>
								);
							}) : null
						}
					</div>
				</div>
			)
		};
	};

	//NON MEMBER
	renderTambahSaldoNonMember = () => {

		const { authenticatedMember, handleInputChange, topupData, optionTopUpMember} = this.props;

		// console.log(optionTopUpMember[0].balance > topupData ? "Masukkan jumlah saldo yang diinginkan" : "Minimum Top up sebeesar Rp. " +  optionTopUpMember[0].balance) + ". Tambahkan saldo Top up";

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
		);
	};

	//TAXI ONLINE
	renderTambahSaldoTaxiOnline = () => {
		
		const { optionTopUpMember, handleTopUpTaxiOnline } = this.props;

		console.log(optionTopUpMember.length ? optionTopUpMember[0] : null);
        let balance = optionTopUpMember.length ? optionTopUpMember[0].balance : null;
        let bonus = optionTopUpMember.length ? optionTopUpMember[0].bonus : null;

		return (
			<div>
				<Button type="button" theme="primary" onClick={(e) => handleTopUpTaxiOnline(optionTopUpMember[0], e)}>
                    <h5>Rp. {parseInt(balance)}</h5>
                </Button><br />
                <h5><small className="margin-right-small left">Bonus : { parseInt(bonus) }</small></h5>
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
	};

	render() {
		
		const {
			authenticatedMember,
			paymentMethod,
			isModalOpen,
			toggleModal,
			topupData,
			handleTopupSubmit,
			handleInputChange,
			handleTopUpPaymentCheckout,
			optionTopUpMemberThemeButton,
			memberNominal
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
						
						</FormGroup>
						<FormGroup row>
							
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
							<FormField label={optionTopUpMemberThemeButton === true ? "Terpilih : Rp. " + memberNominal : "Jumlah Top Up" }>
							{/* { console.log(typeMember)} */}
							{ typeMember === "Non-Member" ? this.renderTambahSaldoNonMember() : null}
							{ typeMember === "Member" ? this.renderTambahSaldoMember() : null}
							{ typeMember === "Taxi Online" ? this.renderTambahSaldoTaxiOnline() : null}
							</FormField>
						</FormGroup>
					</ModalBody>

					<ModalFooter className="flex justify-content--center">
						<Button type="button" theme="danger" className="margin-right-small" onClick={() => toggleModal('topup')}>
							<small className="tt-uppercase fw-semibold ls-base">Kembali</small>
						</Button>
						<Button theme="primary" className="clr-light margin-left-small">
							<small className="tt-uppercase fw-semibold ls-base">Isi Saldo</small>
						</Button>
		

						{/* {
							typeMember !== "Taxi Online" ?
								<Button theme="primary" className="clr-light margin-left-small">
									<small className="tt-uppercase fw-semibold ls-base">Isi Saldo</small>
								</Button>
							: null
						} */}


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