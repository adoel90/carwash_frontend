import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { Form, FormGroup } from '../Form';
import { Input, InputCurrency, InputGroup, InputAddon, Label } from '../Input';
import { Button, ButtonGroup } from '../Button';
import { TabContent } from '../Tab';
import { PropsRoute } from '../Route';
import { Row } from '../Grid';

import SettingsServiceTypeContainer from '../../containers/SettingsServiceTypeContainer';

class SettingsService extends Component {
	constructor() {
		super();
		this.triggerFileChange = this.triggerFileChange.bind(this);
		this.renderPhotoPreview = this.renderPhotoPreview.bind(this);
		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
		this.renderNewServiceModal = this.renderNewServiceModal.bind(this);
		this.renderNewServiceTypeModal = this.renderNewServiceTypeModal.bind(this);
		this.renderUpdateServiceModal = this.renderUpdateServiceModal.bind(this);
	}

	renderPhotoPreview = () => {
		const {
			newService
		} = this.props;

		if(!newService.imagePreview) {
			return <i className="fi flaticon-picture icon icon--gigant clr-primary" onClick={this.triggerFileChange}></i>
		}
		else {
			return <img src={newService.imagePreview} style={{ width: '100%' }} />
		}

	}

	triggerFileChange = (e) => {
		const fileInput = ReactDOM.findDOMNode(this.fileInput);
		fileInput.click();
	}

	renderNewServiceTypeModal = () => {
		const {
			isModalOpen,
			toggleModal,
			handleNewServiceType,
			handleNewServiceTypeSubmit,
			handleInputChange,
			newServiceType
		} = this.props;

		return (
			<Modal
				name="newService"
				isOpen={isModalOpen.newServiceType}
				toggle={() => toggleModal('newServiceType')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Buat Kategori Service Baru</h6>
				</ModalHeader>
				<Form onSubmit={handleNewServiceTypeSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama Kategori Service</Label>
							<Input
								type="text"
								name="name"
								placeholder="Masukkan nama kategori service baru"
								onChange={(e) => handleInputChange(newServiceType, e)}
								autoFocus="true"
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('newServiceType')}>
							<small className="tt-uppercase ls-base fw-semibold">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light" onClick={() => toggleModal('newServiceType')}>
							<small className="tt-uppercase ls-base fw-semibold">Buat</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderNewServiceModal = () => {
		const {
			isModalOpen,
			toggleModal,
			newService,
			handleInputChange,
			handleImageChange,
			handleNewServiceSubmit,
		} = this.props;

		return (
			<Modal
				name="newService"
				isOpen={isModalOpen.newService}
				toggle={() => toggleModal('newService')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Buat Service Baru</h6>
				</ModalHeader>
				<Form onSubmit={handleNewServiceSubmit}>
					<ModalContent>
						<Row>
							<div className="column-3 flex flex-column align-items--center justify-content--center">
								{this.renderPhotoPreview()}
								<Input
									name="image"
									type="file"
									accept="image/*"
									ref={(input) => this.fileInput = input }
									onChange={(e) => handleImageChange(newService, e)}
									style={{display: 'none'}}
									readOnly
								/>
								<p className="fw-semibold clr-primary">Tambahkan Foto</p>
							</div>
							<div className="column-9">
								<FormGroup row>
									<Label htmlFor="name" className="fw-semibold">Nama Service</Label>
									<Input
										type="text"
										name="name"
										placeholder="Masukkan nama service baru"
										onChange={(e) => handleInputChange(newService, e)}
									/>
								</FormGroup>
								<FormGroup row>
									<Label htmlFor="price" className="fw-semibold">Harga</Label>
									<InputGroup>
										<InputAddon>
											<small className="fw-semibold tt-uppercase ls-base">Rp</small>
										</InputAddon>
										<InputCurrency
											type="text"
											name="price"
											placeholder="Masukkan harga service baru"
											thousandSeparator={true}
											onChange={(e) => handleInputChange(newService, e)}
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup row>
									<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
									<Input
										type="textarea"
										name="description"
										placeholder="Masukkan deskripsi service baru"
										onChange={(e) => handleInputChange(newService, e)}
									/>
								</FormGroup>
							</div>
						</Row>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('newService')}>
							<small className="tt-uppercase ls-base fw-semibold">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="tt-uppercase ls-base fw-semibold">Buat</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderUpdateServiceModal = () => {
		const {
			selectedService,
			handleInputChange,
			handleServiceUpdateSubmit,
			toggleModal,
			isModalOpen
		} = this.props;

		return (
			<Modal
				name="editService"
				isOpen={isModalOpen.editService}
				toggle={() => toggleModal('editService')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Perubahan Service: <span className="clr-primary">{selectedService.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleServiceUpdateSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama Service</Label>
							<Input
								name="name"
								type="text"
								placeholder="Masukkan nama service"
								value={selectedService.name}
								onChange={(e) => handleInputChange(selectedService, e)}
							/>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="price" className="fw-semibold">Harga Service</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold tt-uppercase ls-base">Rp</small>
								</InputAddon>
								<InputCurrency
									name="price"
									type="text"
									placeholder="Masukkan harga service"
									thousandSeparator={true}
									value={selectedService.price}
									onChange={(e) => handleInputChange(selectedService, e)}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
							<Input
								name="description"
								type="textarea"
								placeholder="Masukkan deskripsi service"
								value={selectedService.description}
								onChange={(e) => handleInputChange(selectedService, e)}
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('editService')}>
							<small className="fw-semibold tt-uppercase ls-base">Batalkan</small>
						</Button>
						<Button type="submit" buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Terapkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	// handleNewServiceTypeSubmit = (e) => {
	// 	e.preventDefault();
	// 	this.props.handleNewServiceType();
	// }
	//
	// renderNewServiceTypeModal = () => {
	// 	const {
	// 		isModalOpen,
	// 		toggleModal,
	// 		handleInputChange
	// 	} = this.props;
	//
	// 	return (
	// 		<Modal isOpen={isModalOpen} toggle={toggleModal}>
	// 			<ModalHeader align="center">
	// 				<h6 className="fw-semibold">Tambah Tipe Service</h6>
	// 			</ModalHeader>
	// 			<Form onSubmit={this.handleNewServiceTypeSubmit}>
	// 				<ModalContent>
	// 					<FormGroup>
	// 						<Label className="fw-semibold">Nama Tipe Service</Label>
	// 						<Input
	// 							name="name"
	// 							type="text"
	// 							placeholder="Masukkan nama tipe service baru"
	// 							onChange={handleInputChange}
	// 							autoFocus="true"
	// 						/>
	// 					</FormGroup>
	// 				</ModalContent>
	// 				<ModalFooter className="flex">
	// 					<Button type="button" buttonTheme="danger" buttonSize="small" buttonFull className="margin-right-2" onClick={toggleModal}>
	// 						<small className="fw-semibold tt-uppercase ls-base">Batal</small>
	// 					</Button>
	// 					<Button buttonTheme="primary" buttonSize="small" buttonFull>
	// 						<small className="fw-semibold tt-uppercase ls-base">Simpan</small>
	// 					</Button>
	// 				</ModalFooter>
	// 			</Form>
	// 		</Modal>
	// 	)
	// }

	renderTabContent = (type, i) => {
		const {
			match,
			activeTab
		} = this.props;

		return (
			<TabContent activeTab={activeTab} tabIndex={i}>
				<PropsRoute
					path={`${match.url}/${i}`}
					component={SettingsServiceTypeContainer}
					type={type}
					{...this.props}
				/>
			</TabContent>
		)
	}

	renderTabNav = (type, i) => {
		const {
			activeTab,
			toggleTab
		} = this.props;

		return (
			<NavItem>
				<NavTabLink
					active={activeTab === i}
					onClick={() => toggleTab(i)}>
					{type.name}
				</NavTabLink>
			</NavItem>
		)
	}

	// toggleTab = (index) => {
	// 	this.setState({
	// 		activeTab: index
	// 	})
	// }

	render() {
		const {
			service,
			serviceTypes,
			toggleModal,
			handleNewServiceType
		} = this.props

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h5 className="fw-semibold">Daftar Service</h5>
					<Button type="button" buttonTheme="primary" buttonSize="small" className="clr-light" onClick={handleNewServiceType}>
						<i className="ion-gear-b icon icon--base margin-right-3"></i>
						<small className="fw-semibold tt-uppercase ls-base">Pengaturan</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{serviceTypes.length ? serviceTypes.map(this.renderTabNav) : null}
				</Nav>
				{ serviceTypes.length ? serviceTypes.map(this.renderTabContent) : null}
				{ this.renderNewServiceModal() }
				{ this.renderNewServiceTypeModal() }
				{ this.renderUpdateServiceModal() }
			</div>
		);
	}
}

export default SettingsService;
