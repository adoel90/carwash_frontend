import React, { Component } from 'react';

import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import Button from '../Button';


class CashierNewCardForm extends Component {
	constructor() {
		super();
		this.state = {
			fullname: '',
			phone: '',
			email: '',
			address: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		console.log(this.state);
	}

	handleSubmit = (e) => {
		e.preventDefault();

	}

	render() {
		const {
			fullname,
			phone,
			email,
			address
		} = this.state

		return (
			<Form>
				<FormGroup>
					<Label htmlFor="card">
						<p className="fw-semibold">Tipe Kartu</p>
					</Label>
					<Input type="select">
						<option>Regular</option>
						<option>Taxi Online</option>
						<option>Non-Member</option>
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
					<Input name="email" type="email" placeholder="Masukkan alamat email customer" onChange={this.handleChange} value={fullname} required />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="phone">
						<p className="fw-semibold">Nomor Telepon</p>
					</Label>
					<Input name="phone" type="text" placeholder="Masukkan nomor telepon/HP customer" onChange={this.handleChange} value={fullname} required/>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="address">
						<p className="fw-semibold">Alamat</p>
					</Label>
					<Input name="address" type="textarea" placeholder="Masukkan alamat rumah customer" onChange={this.handleChange} value={fullname} required />
				</FormGroup>
				<Button buttonTheme="primary" type="submit" buttonFull>
					<small className="fw-bold tt-uppercase ls-base">Selesai</small>
				</Button>
			</Form>
		);
	}

}

export default CashierNewCardForm;
