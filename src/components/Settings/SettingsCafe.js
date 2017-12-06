import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { Button, ButtonGroup } from '../Button';
import { TabContent } from '../Tab';
import { PropsRoute } from '../Route';
import { Row } from '../Grid';
import { List, ListGroup, ListGroupItem } from '../List';

import SettingsCafeTypeContainer from '../../containers/SettingsCafeTypeContainer';

class SettingsCafe extends Component {
	constructor() {
		super();
		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
		// this.renderCafeTypeCreateModal = this.renderCafeTypeCreateModal.bind(this);
		this.renderCafeTypeSettingsModal = this.renderCafeTypeSettingsModal.bind(this);
	}

	renderCafeTypeSettingsModal = () => {
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

	renderTabContent = (type, i) => {
		const {
			match,
			activeTab
		} = this.props;

		return (
			<TabContent activeTab={activeTab} tabIndex={i}>
				<PropsRoute
					path={`${match.url}/${i}`}
					component={SettingsCafeTypeContainer}
					type={type}
					{...this.props}
				/>
			</TabContent>
		)
	}

	render = () => {
		const {
			cafe,
			cafeTypes,
			handleCafeTypeSettings
		} = this.props;

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h4 className="fw-semibold">Daftar Menu Cafe</h4>
					<Button type="button" buttonTheme="primary" className="clr-light" onClick={handleCafeTypeSettings}>
						<small className="fw-semibold tt-uppercase ls-base">Pengaturan</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{cafe.types.isLoaded ? cafeTypes.active.map(this.renderTabNav) : null}
				</Nav>
				{cafe.types.isLoaded ? cafeTypes.active.map(this.renderTabContent) : null}
				{this.renderCafeTypeSettingsModal()}
			</div>
		);
	}
}

export default SettingsCafe;
