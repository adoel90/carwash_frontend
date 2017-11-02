import React, { Component } from 'react';

import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import { PageBlock } from '../Page';
import Button from '../Button';

class CashierNewCard extends Component {
	constructor() {
		super();
		this.state = {
			fullname: '',
			phone: '',
			email: '',
			address: ''
		}

		this.handleChange = this.handleChange.bind(this);
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

	render() {
		const {
			fullname,
			phone,
			email,
			address
		} = this.state

		return (
			<div className="inner-view">
				<div className="padding-bottom-3">
					<h5 className="fw-semibold">Pendaftaran Kartu Baru</h5>
					<p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p>
				</div>
				<PageBlock className="margin-bottom-5">
					<Form>
						<FormGroup>
							<Label htmlFor="">
								<p className="fw-medium">Nama Lengkap</p>
							</Label>
							<Input name="fullname" type="text" placeholder="Masukkan nama lengkap customer" onChange={this.handleChange} value={fullname} required />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="">
								<p className="fw-medium">Alamat E-mail</p>
							</Label>
							<Input name="email" type="email" placeholder="Masukkan alamat email customer" onChange={this.handleChange} value={fullname} required />
						</FormGroup>
						<FormGroup>
							<Label htmlFor="">
								<p className="fw-medium">Nomor Telepon</p>
							</Label>
							<Input name="phone" type="text" placeholder="Masukkan nomor telepon/HP customer" onChange={this.handleChange} value={fullname} required/>
						</FormGroup>
						<FormGroup>
							<Label htmlFor="">
								<p className="fw-medium">Alamat</p>
							</Label>
							<Input name="address" type="textarea" placeholder="Masukkan alamat rumah customer" onChange={this.handleChange} value={fullname} required />
						</FormGroup>
						<Button buttonTheme="primary" type="submit" buttonFull>
							<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
						</Button>
					</Form>

				</PageBlock>
			</div>
		);
	}

}

export default CashierNewCard;
