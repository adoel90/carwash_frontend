import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewMember } from '../../actions/member.action';

import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';


class CashierNewCardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card: '1',
			fullname: '',
			phone: '',
			email: '',
			address: '',
			isModalOpen: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal = () => {
		this.setState({ isModalOpen: !this.state.isModalOpen })
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit = (e) => {
		const {
			dispatch,
			accessToken
		} = this.props;

		e.preventDefault();

		const requiredData = {
			card: parseInt(this.state.card),
			name: this.state.fullname,
			phone: this.state.phone,
			email: this.state.email,
			address: this.state.address
		}

		dispatch(createNewMember(requiredData, accessToken));
	}

	render() {
		const {
			card,
			fullname,
			phone,
			email,
			address
		} = this.state

		console.log(this.props);

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label htmlFor="card">
							<p className="fw-semibold">Tipe Kartu</p>
						</Label>
						<Input name="card" type="select" value={this.value} onChange={this.handleChange}>
							<option value="1">Regular</option>
							<option value="2">Taxi Online</option>
							<option value="3">Non-Member</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="fullname">
							<p className="fw-semibold">Nama Lengkap</p>
						</Label>
						<Input name="fullname" type="text" placeholder="Masukkan nama lengkap customer" onChange={this.handleChange} value={fullname} required />
					</FormGroup>
					<FormGroup>
						<Label htmlFor="email">
							<p className="fw-semibold">Alamat E-mail</p>
						</Label>
						<Input name="email" type="email" placeholder="Masukkan alamat email customer" onChange={this.handleChange} value={email} required />
					</FormGroup>
					<FormGroup>
						<Label htmlFor="phone">
							<p className="fw-semibold">Nomor Telepon</p>
						</Label>
						<Input name="phone" type="text" placeholder="Masukkan nomor telepon/HP customer" onChange={this.handleChange} value={phone} required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="address">
							<p className="fw-semibold">Alamat</p>
						</Label>
						<Input name="address" type="textarea" placeholder="Masukkan alamat rumah customer" onChange={this.handleChange} value={address} required />
					</FormGroup>
					<Button buttonTheme="primary" type="submit" buttonFull>
						<small className="fw-bold tt-uppercase ls-base">Lanjutkan</small>
					</Button>
				</Form>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader>
						<h6 className="fw-semibold">Konfirmasi Customer Baru</h6>
					</ModalHeader>
					<ModalContent>
					</ModalContent>
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

export default connect(mapStateToProps)(CashierNewCardForm);
