import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { authenticateMember } from '../../actions/member.action'
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../assets/icons/Business/credit-card-4.svg';
import NumberFormat from 'react-number-format';
import Button from '../Button';

class CashierTopUpForm extends Component {
	constructor() {
		super();
		this.state = {
			cardId: '',
			isTopupModalOpen: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.renderMemberInfo = this.renderMemberInfo.bind(this);
	}

	renderMemberInfo = () => {
		const { member } = this.props;

		return (
			<ModalContent>
				<Row>
					<div className="column-3">
						<img src={CardIcon} />
					</div>
					<div className="column-9">
						<h4 className="fw-semibold">{member.data.name}</h4>
						<h5>
							<NumberFormat
								displayType={'text'}
								format="#### #### #### ####"
								value={member.data.card.id}
							/>
						</h5>
						<p>{member.data.email}</p>
						<p>{member.data.address}</p>
					</div>
				</Row>
				<Form onSubmit={this.handleTopup}>
					<FormGroup>
						<Label>Jumlah Saldo</Label>
						<InputCurrency type="text" placeholder="Rp " autoFocus="true" />
					</FormGroup>
				</Form>
			</ModalContent>
		)
	}

	toggleModal = () => { this.setState({ isTopupModalOpen: !this.state.isTopupModalOpen })}

	handleSubmit = (e) => {
		const { cardId } = this.state
		const {
			dispatch,
			accessToken,
			member
		} = this.props;

		e.preventDefault();

		const requiredData = {
			card: cardId
		}


		dispatch(authenticateMember(requiredData, accessToken))
			.then(() => {
				this.toggleModal();
			})
	}

	handleChange = (e) => {
		this.setState({
			cardId: e.target.value
		})
	}

	handleScroll = (e) => {
		e.preventDefault();
	}

	render() {
		const {
			member
		} = this.props;

		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>No. Kartu Member</Label>
					<InputGroup>
						<Input type="number" placeholder="ID Customer" autoFocus="true" value={this.state.cardId} onChange={this.handleChange} selectOnFocus />
						{/* <Button type="button" buttonTheme="primary" disabled={!member.data}>
							<small className="tt-uppercase fw-semibold ls-base">{!member.data ? 'Kartu Tidak Terdeteksi' : 'Kartu Terdeteksi'}</small>
						</Button> */}
					</InputGroup>
					{ member.error ? <small className="clr-danger">{member.error.message}</small> : null}
				</FormGroup>
				<Modal isOpen={this.state.isTopupModalOpen} toggle={this.toggleModal}>
					<ModalHeader>
						<h6 className="fw-semibold ta-center">Isi Ulang Saldo Customer</h6>
					</ModalHeader>
					{ member.data ? this.renderMemberInfo() : null }
					<ModalFooter>
						<Button buttonTheme="primary" buttonFull>
							<small className="tt-uppercase fw-semibold ls-base">Isi Saldo</small>
						</Button>
					</ModalFooter>
				</Modal>
				{/* <FormGroup>
					<Label>Masukkan saldo yang diigininkan</Label>
					<InputCurrency placeholder="Rp" />
				</FormGroup> */}
			</Form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

export default connect(mapStateToProps)(CashierTopUpForm);
