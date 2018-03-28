import React, { Component } from 'react';
import { Column } from '../../layouts/Grid';
import { ModalHeader, ModalContent, ModalFooter, Modal, ModalDialog} from '../../components/Modal';
import { Form, FormGroup } from '../../components/Form';
// import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Input, InputGroup, InputAddon, InputCurrency, Label, InputCashier } from '../../components/Input';
import { PageBlock } from '../../components/Page';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
// import { Row } from '../Grid';
import { Container, Row } from '../../layouts/Grid';
import { Badge } from '../../components/Badge';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../assets/icons/Business/credit-card-4.svg';
import Currency from '../../components/Currency';
import NumberFormat from 'react-number-format';

class CashierTopUpConfirmation extends Component {


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
			handleInputChange
	
		} = this.props;

		// console.log(this.props.paymentMethod);

		const renderMemberInformation = () => {
			return (
				<div className="padding-bottom-3">	
					<h4 className="fw-semibold clr-primary">{authenticatedMember.data.name}</h4>
					<h5 className="fw-semibold">
						<NumberFormat
							displayType={'text'}
							format="#### #### #### ####"
							value={authenticatedMember.data.card ? authenticatedMember.data.card.id : null}
						/>
					</h5>
					<Badge theme="secondary" className="margin-top-1">
						<small className="fw-semibold tt-uppercase ls-base">{authenticatedMember.data.card ? authenticatedMember.data.card.type.name : null}</small>
					</Badge>
				</div>
			)
		}

		return (
			<Modal
				isOpen={isModalOpen.topup}>
				<Form onSubmit={handleTopupSubmit}>
					<ModalHeader>
						<h6 className="fw-semibold ta-center">Isi Ulang Saldo Customer</h6>
					</ModalHeader>
					<ModalContent>
						<div className="ta-center">
							{renderMemberInformation()}
						</div>
						<FormGroup row>
							<Label className="fw-semibold">Saldo saat ini</Label>
							<InputGroup>
								<InputAddon>
									<small className="tt-uppercase fw-semibold ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									value={authenticatedMember.data.balance}
									readOnly="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label className="fw-semibold">Minimum Saldo</Label>
							<InputGroup>
								<InputAddon>
									<small className="tt-uppercase fw-semibold ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									value={authenticatedMember.data.card ? authenticatedMember.data.card.type.min : null}
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
						<FormGroup row>
							<Label className="fw-semibold">Metode Pembayaran</Label>
							<InputCashier
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

							{/* <InputGroup>
								<Input name="payment" type="text" onChange={(e) => handleInputChange(topupData, e)} value="Cash"></Input>
							</InputGroup> */}
						</FormGroup>
					</ModalContent>


					<ModalFooter className="flex justify-content--center">
						<Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('topup')}>
							<small className="tt-uppercase fw-semibold ls-base">Kembali</small>
						</Button>
						<Button type="submit" buttonTheme="primary" className="clr-light margin-left-2">
							<small className="tt-uppercase fw-semibold ls-base">Selesai & Print Struk</small>
						</Button>
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