import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { Button } from '../Button';
import { ListGroup, ListGroupItem } from '../List';

class SettingsManageCafeType extends Component {
    render() {
        const {
			cafe,
			cafeTypes,
			newCafeType,
			handleNewCafeTypeSubmit,
			handleUpdateCafeTypeSubmit,
			handleChangeCafeTypeStatus,
			handleInputChange,
			handleInputIndexChange,
			isModalOpen,
			toggleModal,
		} = this.props;

		let updateMessage = (typeId) => {
			if(cafe.type.isUpdated && typeId === cafe.type.id) {
				return (
					<small className="clr-success" style={{padding: '15px 10px'}}>Berhasil diubah.</small>
				)
			}
		}

		let cafeTypeItem = (type, index) => {
			return (
				<ListGroupItem>
					<Form onSubmit={(e) => handleUpdateCafeTypeSubmit(type, e)}>
						<Row className="align-items--center">
							<div className="column-12 flex-column justify-content--center">
								<InputGroup className="flex">
									<Input name={type.name} value={type.name} placeholder="Nama tipe cafe" onChange={(e) => handleInputIndexChange(cafeTypes.all, index, e)} required="true"/>
									<Button type="submit" buttonTheme="primary" buttonSize="small">
										<small className="clr-light fw-semibold tt-uppercase ls-base">Ubah</small>
									</Button>
									<Button type="button" buttonTheme={type.status ? 'secondary' : 'danger'} buttonSize="small" onClick={() => handleChangeCafeTypeStatus(type)} disabled={type.statusChanging}>
										<small className={`${type.status ? 'clr-dark' : 'clr-light'} fw-semibold tt-uppercase ls-base`}>{type.statusChanging ? 'Merubah...' : (type.status ? 'Aktif' : 'Tidak Aktif')}</small>
									</Button>
								</InputGroup>
								{/* { updateMessage(type.id) } */}
							</div>
						</Row>
					</Form>
				</ListGroupItem>
			)
		}

		return (
			<Modal
				name="cafeTypeSettings"
				isOpen={isModalOpen.cafeTypeSettings}
				toggle={() => toggleModal('cafeTypeSettings')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Pengaturan Kategori Service</h6>
				</ModalHeader>
				<ModalContent>
					{/* <small>Berikut merupakan daftar kategori yang ada di aplikasi ini. Kategori yang sedang berjalan dan aktif untuk layanan ditandai dengan tombol 'Aktif', dan sebaliknya 'Tidak Aktif' bagi kategori yang sedang tidak berjalan. Silahkan klik tombol tersebut untuk mengubah status kategori.</small> */}
					<ListGroup>
						<Form onSubmit={handleNewCafeTypeSubmit}>
							<h6 className="fw-semibold">Tambah Kategori</h6>
							<ListGroupItem className="align-items--center">
								<Row>
									<div className="column-9">
										<Input
											name="name"
											type="text"
											placeholder="Masukkan nama kategori baru"
											onChange={(e) => handleInputChange(newCafeType, e)}
										/>
									</div>
									<div className="column-3">
										<Button buttonTheme="primary" buttonFull>
											<small className="fw-semibold tt-uppercase ls-base clr-light">Tambah</small>
										</Button>
									</div>
								</Row>
							</ListGroupItem>
						</Form>
						<h6 className="fw-semibold padding-top-3">Daftar Kategori</h6>
						{cafe.types.isLoaded ? cafeTypes.all.map(cafeTypeItem) : null}
					</ListGroup>
				</ModalContent>
				<ModalFooter className="flex justify-content--center">
					<Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('cafeTypeSettings')}>
						<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
					</Button>
				</ModalFooter>
			</Modal>
		)
    }
}

export default SettingsManageCafeType;