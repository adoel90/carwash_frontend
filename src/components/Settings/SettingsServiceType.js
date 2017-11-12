import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PageBlockGroup, PageBlock } from '../Page';
import { Modal, Table } from 'reactstrap';
import { Button } from '../Button';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { DialogConfirm } from '../Dialog';
import SearchBar from '../SearchBar';

class SettingsServiceType extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handlePhotoPreviewClick = this.handlePhotoPreviewClick.bind(this);
		this.handlePhotoChange = this.handlePhotoChange.bind(this);
		this.handleEditServiceSubmit = this.handleEditServiceSubmit.bind(this);
		this.handleNewServiceSubmit = this.handleNewServiceSubmit.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.renderTableBody = this.renderTableBody.bind(this);
		this.renderNewServiceModal = this.renderNewServiceModal.bind(this);
		this.renderEditServiceModal = this.renderEditServiceModal.bind(this);
		this.renderPhotoPreview = this.renderPhotoPreview.bind(this);
	}



	toggleEditServiceModal = (item) => {
		this.props.toggleEditServiceModal(item);
	}

	handleEditServiceSubmit = (e) => {
		e.preventDefault();
		this.props.handleEditService();
	}

	handleNewServiceSubmit = (e) => {
		e.preventDefault();
		this.props.handleNewService();
	}

	handleChange = (e) => {
		this.props.handleInputChange(e);
	}

	handlePhotoChange = (e) => {
		this.props.handlePhotoChange(e.target.files);
	}

	handlePhotoPreviewClick = () => {
		const photoInput = ReactDOM.findDOMNode(this.photoInput);
		photoInput.click();
	}

	renderPhotoPreview = () => {
		if(!this.props.menu.image) {
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

	renderEditServiceModal = () => {
		const {
			menu,
			type,
			isModalOpen,
			toggleDialog,
			toggleEditServiceModal
		} = this.props;

		return (
			<Modal isOpen={isModalOpen.editService} toggle={toggleEditServiceModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah menu: <span className="fw-semibold clr-primary">{type.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={this.handleEditServiceSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label>
								<small className="fw-semibold tt-uppercase ls-base">Nama Menu</small>
							</Label>
							<Input
								type="text"
								name="name"
								placeholder="Masukkan nama menu"
								onChange={this.handleChange}
								value={menu.name}
								required="true"
							/>
						</FormGroup>
						<FormGroup row>
							<Label>
								<small className="fw-semibold tt-uppercase ls-base">Harga</small>
							</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<Input
									type="text"
									name="price"
									placeholder="Masukkan harga menu"
									onChange={this.handleChange}
									value={menu.price}
									required="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label>
								<small className="fw-semibold tt-uppercase ls-base">Deskripsi</small>
							</Label>
							<Input
								type="textarea"
								name="description"
								placeholder="Masukkan deskripsi menu"
								onChange={this.handleChange}
								value={menu.description}
								required="true"
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter>
						<Button buttonTheme="primary" buttonSize="small" buttonFull>
							<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderNewServiceModal = () => {
		const {
			menu,
			type,
			isModalOpen,
			toggleNewServiceModal
		} = this.props;

		return (
			<Modal isOpen={isModalOpen.newService} toggle={toggleNewServiceModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Tambah menu: <span className="clr-primary fw-bold">{type.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={this.handleNewServiceSubmit}>
					<ModalContent>
						<Row>
							<div className="column-4 flex-column flex align-items--center justify-content--center">
								{this.renderPhotoPreview()}
								<Input
									name="photo"
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
					<Button buttonTheme="secondary" buttonSize="small" onClick={this.toggleEditServiceModal.bind(this, item)}>
						<small className="clr-dark fw-semibold tt-uppercase ls-base">Ubah</small>
					</Button>
				</td>
			</tr>
		)
	}

	renderTable = () => {
		let {
			type,
			service,
			serviceList
		} = this.props;

		if(service.isFetching) {
			return null;
		}

		if(serviceList) {
			if(serviceList.length) {
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
							{ serviceList.map(this.renderTableBody) }
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
			type,
			service,
			serviceList,
			toggleNewServiceModal
		} = this.props;

		return (
			<PageBlockGroup>
				<PageBlock>
					{this.renderTable()}
				</PageBlock>
				<PageBlock extension>
					<Button type="button" buttonTheme="primary" buttonFull onClick={toggleNewServiceModal}>
						<small className="fw-semibold tt-uppercase ls-base">Tambah Menu</small>
					</Button>
				</PageBlock>
				{this.renderNewServiceModal()}
				{this.renderEditServiceModal()}
			</PageBlockGroup>
		)
	}

}

export default SettingsServiceType;
