import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PageBlock, PageBlockGroup } from '../Page';
import { Modal, Table } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Button } from '../Button';
import { Row } from '../Grid';

class SettingsCafeType extends Component {
	constructor() {
		super();
		this.toggleNewMenuModal = this.toggleNewMenuModal.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handlePhotoPreviewClick = this.handlePhotoPreviewClick.bind(this);
		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.handleEditMenuSubmit = this.handleEditMenuSubmit.bind(this);
		this.handleNewMenuSubmit = this.handleNewMenuSubmit.bind(this);

		this.renderTable = this.renderTable.bind(this);
		this.renderTableBody = this.renderTableBody.bind(this);
		this.renderPhotoPreview = this.renderPhotoPreview.bind(this);
		this.renderNewMenuModal = this.renderNewMenuModal.bind(this);
		this.renderEditMenuModal = this.renderEditMenuModal.bind(this);

	}

	handleChange = (e) => {
		this.props.handleInputChange(e);
	}

	handleEditMenuSubmit = (e) => {
		e.preventDefault();
		this.props.handleEditMenuSubmit();
	}

	handleNewMenuSubmit = (e) => {
		e.preventDefault();
		this.props.handleNewMenu();
	}

	handlePhotoPreviewClick = () => {
		const photoInput = ReactDOM.findDOMNode(this.photoInput);
		photoInput.click();
	}

	renderPhotoPreview = () => {
		const {
			menu
		} = this.props;

		if(!menu.image) {
			return (
				<Button type="button" className="flex flex-column align-items--center justify-content--center" onClick={this.handlePhotoPreviewClick}>
					<i className="fi flaticon-photo-camera icon icon--gigant clr-passive"></i>
					<small className="tt-uppercase ls-base fw-semibold clr-passive">Tambah Foto</small>
				</Button>
			)
		}
		else {
			return (
				<div className="flex flex-column align-items--center justify-content--center" style={{ height: '300px', width: '100%'}}>
					<figure className="figure margin-bottom-3" style={{ width: '100%'}} onClick={this.handlePhotoPreviewClick}>
						<img src={this.props.menu.image} />
					</figure>
					<small className="tt-uppercase ls-base fw-semibold clr-passive">Ubah Foto</small>
				</div>
			)
		}
	}

	handlePhotoChange = (e) => {
		this.props.handlePhotoChange(e.target.files);
	}

	toggleEditMenuModal = (item) => {
		this.props.toggleEditMenuModal(item);
	}

	toggleNewMenuModal = () => {
		this.props.toggleNewMenuModal();
	}

	renderEditMenuModal = () => {
		const {
			type,
			menu,
			isModalOpen,
			toggleEditMenuModal
		} = this.props;

		return (
			<Modal isOpen={isModalOpen.editMenu} toggle={toggleEditMenuModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Menu: <span className="fw-bold clr-primary">{type.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={this.handleEditMenuSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label>
								<small className="fw-semibold tt-uppercase ls-base">Nama Menu</small>
							</Label>
							<Input
								name="name"
								type="text"
								placeholder="Masukkan nama menu baru"
								onChange={this.handleChange}
								value={menu.name}
								required="true"
							/>
						</FormGroup>
						<FormGroup row>
							<Label>
								<small className="fw-semibold tt-uppercase ls-base">Harga Menu</small>
							</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<Input
									type="text"
									name="price"
									placeholder="Harga Menu"
									value={menu.price}
									onChange={this.handleChange}
									required="true"
								/>
							</InputGroup>
							{/* <Input name="name" type="text" placeholder="Masukkan nama menu baru" /> */}
						</FormGroup>
						<FormGroup row>
							<Label>
								<small className="fw-semibold tt-uppercase ls-base">Deskripsi</small>
							</Label>
							<Input
								name="description"
								type="textarea"
								value={menu.description}
								onChange={this.handleChange}
								placeholder="Masukkan deskripsi menu"
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter>
						<Button buttonTheme="primary" buttonFull>
							<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderNewMenuModal = () => {
		const {
			type,
			menu,
			isModalOpen
		} = this.props;

		return (
			<Modal isOpen={isModalOpen.newMenu} toggle={this.toggleNewMenuModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Menu Baru: <span className="fw-bold clr-primary">{type.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={this.handleNewMenuSubmit}>
					<ModalContent>
						<Row>
							<div className="column-4 flex-column flex align-items--center justify-content--center">
								{this.renderPhotoPreview()}
								<Input
									name="image"
									type="file"
									accept="image/*"
									ref={(input) => this.photoInput = input }
									onChange={(e) => this.handlePhotoChange(e)}
									style={{display: 'none'}}
									readOnly
								/>
							</div>
							<div className="column-8">
								<FormGroup>
									<Label>
										<small className="fw-semibold tt-uppercase ls-base">Nama Menu</small>
									</Label>
									<Input
										name="name"
										type="text"
										placeholder="Masukkan nama menu baru"
										onChange={this.handleChange}
										value={menu.name}
										required="true"
									/>
								</FormGroup>
								<FormGroup>
									<Label>
										<small className="fw-semibold tt-uppercase ls-base">Harga Menu</small>
									</Label>
									<InputGroup>
										<InputAddon>
											<small className="fw-semibold tt-uppercase ls-base">Rp</small>
										</InputAddon>
										<Input
											type="text"
											name="price"
											placeholder="Harga Menu"
											value={menu.price}
											onChange={this.handleChange}
											required="true"
										/>
									</InputGroup>
									{/* <Input name="name" type="text" placeholder="Masukkan nama menu baru" /> */}
								</FormGroup>
								<FormGroup>
									<Label>
										<small className="fw-semibold tt-uppercase ls-base">Deskripsi</small>
									</Label>
									<Input
										name="description"
										type="textarea"
										value={menu.description}
										onChange={this.handleChange}
										placeholder="Masukkan deskripsi menu"
									/>
								</FormGroup>
								{/* <FormGroup>
									<Label>
										<small className="fw-semibold tt-uppercase ls-base">Unggah Foto</small>
									</Label>
									<input type="file" />
								</FormGroup> */}
							</div>
						</Row>
					</ModalContent>
					<ModalFooter>
						<Button buttonTheme="primary" buttonFull>
							<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderTableBody = (item, i) => {
		return (
			<tr>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>{item.description}</td>
				<td>
					<Button buttonTheme="secondary" buttonSize="small" onClick={this.toggleEditMenuModal.bind(this, item)}>
						<small className="clr-dark fw-semibold tt-uppercase ls-base">Ubah</small>
					</Button>
				</td>
			</tr>
		)
	}

	renderTable = () => {
		let {
			type,
			cafe
		} = this.props;

		if(cafe.isFetching) {
			return null;
		}

		if(cafe.list.menu) {
			if(cafe.list.menu.length) {
				return (
					<Table className="margin-bottom-3">
						<thead className="thead--primary">
							<tr>
								<th>Nama Menu</th>
								<th>Harga</th>
								<th>Deskripsi</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{ cafe.list.menu.map(this.renderTableBody) }
						</tbody>
					</Table>
				)
			} else {
				return (
					<div className="flex justify-content--center flex-column ta-center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Maaf, sistem tidak dapat menemukan daftar menu untuk <span className="fw-semibold">{type.name}</span>. <br /> Silahkan klik tombol di bawah untuk menambahkan menu baru.</p>
					</div>
				)
			}
		}
	}

	render() {
		const {
			toggleNewMenuModal
		} = this.props;

		return (
			<PageBlockGroup>
				<PageBlock>
					{this.renderTable()}
				</PageBlock>
				<PageBlock extension>
					<Button type="button" buttonTheme="primary" buttonFull onClick={toggleNewMenuModal}>
						<small className="fw-semibold tt-uppercase ls-base">Tambah Menu</small>
					</Button>
				</PageBlock>
				{this.renderNewMenuModal()}
				{this.renderEditMenuModal()}
			</PageBlockGroup>
		);
	}

}

export default SettingsCafeType;
