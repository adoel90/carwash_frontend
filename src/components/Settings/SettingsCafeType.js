import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PageBlock, PageBlockGroup } from '../Page';
import { Modal, Table } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Row } from '../Grid';
import { SettingsCafeMenuList } from '../Settings';

class SettingsCafeType extends Component {
	constructor() {
		super();
		this.triggerFileChange = this.triggerFileChange.bind(this);
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
		this.renderCafeMenuCreateModal = this.renderCafeMenuCreateModal.bind(this);
		this.renderCafeMenuUpdateModal = this.renderCafeMenuUpdateModal.bind(this);
		this.renderPhotoPreview = this.renderPhotoPreview.bind(this);
	}

	// renderCafeMenuDeleteModal = () => {
	// 	const {
	// 		isModalOpen,
	// 		toggleModal,
	// 		selectedCafeMenu
	// 		handleCafeMenuDeleteSubmit
	// 	} = this.props;
	//
	// 	return (
	// 		<Modal
	// 			isOpen={isModalOpen.cafeMenuDelete}
	// 			toggle={() => toggleModal('cafeMenuDelete')}>
	// 			<ModalHeader align="center">
	// 				<h6 className="fw-semibold">Hapus Menu Cafe: <span className="fw-bold">{selectedCafeMenu.name}</span></h6>
	// 			</ModalHeader>
	// 			<Form onSubmit={handleCafeMenuDeleteSubmit}>
	// 				<ModalContent>
	//
	// 				</ModalContent>
	// 				<ModalFooter className="flex justify-content--flex-end">
	// 					<Button buttonTheme="danger" className="clr-light margin-right-2">
	// 						<small className="fw-semibold tt-upperacse ls-base">Batal</small>
	// 					</Button>
	// 					<Button buttonTheme="success" className="clr-light">
	// 						<small className="fw-semibold tt-upperacse ls-base"></small>
	// 					</Button>
	// 				</ModalFooter>
	// 			</Form>
	// 		</Modal>
	// 	);
	// }

	triggerFileChange = (e) => {
		const fileInput = ReactDOM.findDOMNode(this.fileInput);
		fileInput.click();
	}

	renderPhotoPreview = () => {
		const {
			cafeMenuCreate
		} = this.props;

		if(!cafeMenuCreate.imagePreview) {
			return <i className="fi flaticon-picture icon icon--gigant clr-primary" onClick={this.triggerFileChange}></i>
		}
		else {
			return <img src={cafeMenuCreate.imagePreview} style={{ width: '100%' }} onClick={this.triggerFileChange} />
		}
	}

	renderCafeMenuCreateModal = () => {
		const {
			isModalOpen,
			toggleModal,
			handleCafeMenuCreateSubmit,
			handleImageChange,
			cafeMenuCreate,
			handleInputChange,
			selectedCafeMenu
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.cafeMenuCreate}
				toggle={() => toggleModal('cafeMenuCreate')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Buat Menu Cafe Baru</h6>
				</ModalHeader>
				<Form onSubmit={handleCafeMenuCreateSubmit}>
					<ModalContent>
						<Row>
							<div className="column-4 flex flex-column align-items--center justify-content--center">
								{this.renderPhotoPreview()}
								<Input
									name="image"
									type="file"
									accept="image/*"
									ref={(input) => this.fileInput = input }
									onChange={(e) => handleImageChange(cafeMenuCreate, e)}
									style={{display: 'none'}}
									readOnly
								/>
								<p className="fw-semibold clr-primary">Tambahkan Foto</p>
							</div>
							<div className="column-8">
								<FormGroup>
									<Label htmlFor="name" className="fw-semibold">Nama Menu</Label>
									<Input
										type="text"
										name="name"
										placeholder="Masukkan nama menu baru"
										onChange={(e) => handleInputChange(cafeMenuCreate, e)}
										required="true"
										autoFocus
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="name" className="fw-semibold">Harga Menu</Label>
									<InputGroup>
										<InputAddon>
											<small className="tt-uppercase fw-semibold ls-base">Rp</small>
										</InputAddon>
										<InputCurrency
											type="text"
											name="price"
											thousandSeparator={true}
											placeholder="Masukkan harga menu baru"
											onChange={(e) => handleInputChange(cafeMenuCreate, e)}
											required="true"
										/>
									</InputGroup>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
									<Input
										type="textarea"
										name="description"
										placeholder="Masukkan deskripsi menu baru"
										onChange={(e) => handleInputChange(cafeMenuCreate, e)}
										required="true"
									/>
								</FormGroup>
							</div>
						</Row>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('cafeMenuCreate')}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Buat</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderCafeMenuUpdateModal = () => {
		const {
			isModalOpen,
			toggleModal,
			selectedCafeMenu,
			handleInputChange,
			handleCafeMenuUpdateSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.cafeMenuUpdate}
				toggle={() => toggleModal('cafeMenuUpdate')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Ubah Cafe Menu: <span className="fw-bold clr-primary">{selectedCafeMenu.name}</span></h6>
				</ModalHeader>
				<Form onSubmit={handleCafeMenuUpdateSubmit}>
					<ModalContent>
						<FormGroup row>
							<Label htmlFor="name" className="fw-semibold">Nama Menu</Label>
							<Input
								name="name"
								type="text"
								placeholder="Masukkan nama menu"
								value={selectedCafeMenu.name}
								onChange={(e) => handleInputChange(selectedCafeMenu, e)}
								required="true"
								autoFocus
							/>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="price" className="fw-semibold">Harga Menu</Label>
							<InputGroup>
								<InputAddon>
									<small className="fw-semibold">Rp</small>
								</InputAddon>
								<InputCurrency
									name="price"
									type="text"
									value={selectedCafeMenu.price}
									placeholder="Masukkan harga menu"
									thousandSeparator={true}
									onChange={(e) => handleInputChange(selectedCafeMenu, e)}
									required="true"
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup row>
							<Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
							<Input
								name="description"
								type="textarea"
								value={selectedCafeMenu.description}
								placeholder="Masukkan deskripsi menu"
								onChange={(e) => handleInputChange(selectedCafeMenu, e)}
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('cafeMenuUpdate')}>
							<small className="tt-uppercase ls-base fw-semibold">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="tt-uppercase ls-base fw-semibold">Terapkan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderCafeMenuList = () => {
		const {
			type,
			cafe,
			cafeList
		} = this.props;

		if(cafe.isLoaded) {
			if(cafeList.length) {
				return <SettingsCafeMenuList {...this.props} />
			}
			else {
				return (
					<div className="flex justify-content--center flex-column ta-center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Maaf, sistem tidak dapat menemukan daftar menu untuk kategori <span className="fw-semibold">{type.name}</span>. <br /> Silahkan klik tombol di bawah untuk menambahkan menu baru.</p>
					</div>
				)
			}
		}
	}

	render = () => {
		const {
			type,
			handleCafeMenuCreate
		} = this.props;

		return (
			<PageBlockGroup>
				<PageBlock>
					{ this.renderCafeMenuList() }
				</PageBlock>
				<PageBlock className="flex justify-content--flex-end" extension>
					<Button type="button" buttonTheme="primary" className="clr-light" onClick={() => handleCafeMenuCreate()}>
						<small className="fw-semibold tt-uppercase ls-base">Tambah Menu Baru</small>
					</Button>
				</PageBlock>
				{this.renderCafeMenuCreateModal()}
				{this.renderCafeMenuUpdateModal()}
			</PageBlockGroup>
		)
	}
}

export default SettingsCafeType;
