import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { authenticateMember, memberTopup } from '../../actions/member.action'
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../assets/icons/Business/credit-card-4.svg';
import NumberFormat from 'react-number-format';
import { Button } from '../Button';
import Currency from '../Currency';

class CashierTopUpForm extends Component {
	constructor() {
		super();
		this.state = {
			cardId: '',
			topup: '',
			isTopupModalOpen: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleTopup = this.handleTopup.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.renderMemberInfo = this.renderMemberInfo.bind(this);
	}

	handleTopup = (e) => {
		const {
			dispatch,
			member
		} = this.props;

		e.preventDefault();

		const requiredData = {
			topup: parseInt(this.state.topup)
		}
		
		dispatch(memberTopup(requiredData, member.data.accessToken))
	}

	toggleModal = () => {
		this.setState({
			isTopupModalOpen: !this.state.isTopupModalOpen }
		)}

	handleSubmit = (e) => {
		e.preventDefault();

		const { cardId } = this.state
		const {
			dispatch,
			accessToken,
			member
		} = this.props;

		const requiredData = {
			card: cardId
		}

		dispatch(authenticateMember(requiredData))
			.then(() => {
				this.toggleModal();
			});
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleScroll = (e) => {
		e.preventDefault();
	}

	renderMemberInfo = () => {
		const { member } = this.props;

		return (
			<ModalContent>
				<Row className="flex align-items--center">
					<div className="column-3 flex flex-column align-items--center">
						<img src={CardIcon} />
					</div>
					<div className="column-9">
						<div className="padding-bottom-3">
							<h4 className="fw-semibold clr-primary">{member.data.member.name}</h4>
							<h5 className="fw-semibold">
								<NumberFormat
									displayType={'text'}
									format="#### #### #### ####"
									value={member.data.member.card.id}
								/>
							</h5>
							<p>{member.data.member.email}</p>
							<p>{member.data.member.address}</p>
						</div>
					</div>
				</Row>
				<FormGroup row>
					<Label className="fw-semibold">Saldo saat ini</Label>
					<InputCurrency value={member.data.member.balance} readOnly="true" />
				</FormGroup>
				<FormGroup row>
					<Label className="fw-semibold">Tambah Saldo</Label>
					<InputGroup>
						<InputAddon>
							<small className="tt-uppercase fw-semibold ls-base">Rp</small>
						</InputAddon>
						<Input name="topup" type="text" placeholder="Masukkan jumlah saldo yang diinginkan" onChange={this.handleChange} autoFocus="true" required="required" />
					</InputGroup>

					{/* <InputCurrency name="balance" type="text" placeholder="Rp " onChange={this.handleChange} autoFocus="true" /> */}
				</FormGroup>
				<FormGroup row>
					<Label className="fw-semibold">Pilih Metode Pembayaran</Label>
					<Input type="select">
						<option value={1}>Cash</option>
						<option value={2}>Debit</option>
						<option value={3}>Kredit</option>
					</Input>
				</FormGroup>
			</ModalContent>
		)
	}

	render() {
		const {
			member
		} = this.props;

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<InputGroup>
							<Input name="cardId" type="number" placeholder="Gesek kartu untuk mendapatkan informasi customer" autoFocus="true" value={this.state.cardId} onChange={this.handleChange} selectOnFocus />
						</InputGroup>
						{ member.error ? <small className="clr-danger">{member.error.message}</small> : null}
					</FormGroup>
				</Form>
				<Modal isOpen={this.state.isTopupModalOpen} toggle={this.toggleModal}>
					<Form onSubmit={this.handleTopup}>
						<ModalHeader>
							<h6 className="fw-semibold ta-center">Isi Ulang Saldo Customer</h6>
						</ModalHeader>
						{ member.data ? this.renderMemberInfo() : null }
						<ModalFooter>
							<Button buttonType="button" buttonTheme="primary" buttonFull>
								<small className="tt-uppercase fw-semibold ls-base">Selesai & Print Struk</small>
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

export default connect(mapStateToProps)(CashierTopUpForm);
