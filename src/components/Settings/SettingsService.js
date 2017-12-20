import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { 
	SettingsNewService, 
	SettingsUpdateService, 
	SettingsManageServiceType 
} from '../Settings';
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
import { Alert } from '../Alert';
import { ListGroup, ListGroupItem } from '../List';

import SettingsServiceTypeContainer from '../../containers/SettingsServiceTypeContainer';

class SettingsService extends Component {
	constructor() {
		super();
		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
	}

	renderServiceTypeSettingsModal = () => {
		const {
			service,
			serviceTypes,
			newServiceType,
			serviceTypeSettings,
			handleInputChange,
			handleInputIndexChange,
			isModalOpen,
			toggleModal,
			handleNewServiceTypeSubmit,
			handleUpdateServiceTypeSubmit,
			handleChangeServiceTypeStatus,
		} = this.props;

		let updateMessage = (id) => {
			if(service.type.isUpdated && id === service.type.id) {
				return (
					<small className="clr-success fw-semibold" style={{padding: '15px 10px'}}>Berhasil diubah!</small>
				)
			}
		}

		let serviceTypeItem = (type, index) => {
			return (
				<ListGroupItem>
					<Form onSubmit={(e) => handleUpdateServiceTypeSubmit(type, e)}>
						<Row className="align-items--center">
							<div className="column-12 flex-column justify-content--center">
								<InputGroup className="flex">
									<Input value={type.name} placeholder={type.name} onChange={(e) => handleInputIndexChange(serviceTypes.all, index, e)} required="true"/>
									<Button type="submit" buttonTheme="primary" buttonSize="small">
										<small className="clr-light fw-semibold tt-uppercase ls-base">Ubah</small>
									</Button>
									<Button type="button" buttonTheme={type.status ? 'secondary' : 'danger'} buttonSize="small" onClick={(e) => handleChangeServiceTypeStatus(type)} disabled={type.statusChanging}>
										<small className={`${type.status ? 'clr-dark' : 'clr-light'} fw-semibold tt-uppercase ls-base`}>{type.statusChanging ? 'Merubah...' : (type.status ? 'Aktif' : 'Tidak Aktif')}</small>
									</Button>
								</InputGroup>
								{ updateMessage(type.id) }
							</div>
						</Row>
					</Form>
				</ListGroupItem>
			)
		}

		return (
			<Modal
				name="serviceTypeSettings"
				isOpen={isModalOpen.serviceTypeSettings}
				toggle={() => toggleModal('serviceTypeSettings')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Pengaturan Kategori Service</h6>
				</ModalHeader>
				<ModalContent>
					{/* <small>Berikut merupakan daftar kategori yang ada di aplikasi ini. Kategori yang sedang berjalan dan aktif untuk layanan ditandai dengan tombol 'Aktif', dan sebaliknya 'Tidak Aktif' bagi kategori yang sedang tidak berjalan. Silahkan klik tombol tersebut untuk mengubah status kategori.</small> */}
					<ListGroup>
						<h6 className="fw-semibold">Tambah Baru</h6>
						<ListGroupItem className="align-items--center">
							<Form onSubmit={handleNewServiceTypeSubmit}>
								<Row>
									<div className="column-9">
										<Input
											name="name"
											type="text"
											placeholder="Masukkan nama kategori baru"
											onChange={(e) => handleInputChange(newServiceType, e)}
										/>
									</div>
									<div className="column-3">
										<Button buttonTheme="primary" buttonFull>
											<small className="fw-semibold tt-uppercase ls-base clr-light">Tambah</small>
										</Button>
									</div>
								</Row>
							</Form>
						</ListGroupItem>

						<h6 className="fw-semibold padding-top-3">Daftar Kategori</h6>
						{service.types.isLoaded ? serviceTypes.all.map(serviceTypeItem) : null}
					</ListGroup>
				</ModalContent>
				<ModalFooter className="flex justify-content--center">
					<Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('serviceTypeSettings')}>
						<small className="fw-semibold tt-uppercase ls-base">Kembali</small>
					</Button>
				</ModalFooter>
			</Modal>
		)
	}

	renderTabContent = (type, i) => {
		const {
			match,
			activeTab,
			service,
			serviceTypes
		} = this.props;


		service.types.isLoaded ? serviceTypes.active.map(this.renderTabContent) : null
		
		if(service.types.isLoaded) {
			if(serviceTypes.active.length) {
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
			else {
				return <p>Tidak terdapat data pada kategori ini. Silahkan klik pengaturan untuk membuat kategori baru.</p>
			}
		}

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

	render() {
		const {
			service,
			serviceTypes,
			toggleModal,
			handleServiceTypeSettings
		} = this.props

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<div>
						<h4 className="fw-semibold">Daftar Service</h4>
					</div>
					<div>
						<Button type="button" buttonTheme="primary" className="clr-light" onClick={handleServiceTypeSettings}>
							<small className="fw-semibold tt-uppercase ls-base">Pengaturan</small>
						</Button>
					</div>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{service.types.isLoaded ? serviceTypes.active.map(this.renderTabNav) : null}
				</Nav>
				{ this.renderTabContent() }
				<SettingsUpdateService {...this.props} />
				<SettingsNewService {...this.props} />
				<SettingsManageServiceType {...this.props} />
			</div>
		);
	}
}

export default SettingsService;
