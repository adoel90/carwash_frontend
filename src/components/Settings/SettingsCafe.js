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

import SettingsCafeTypeContainer from '../../containers/SettingsCafeTypeContainer';

class SettingsCafe extends Component {
	constructor() {
		super();
		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
		this.renderCafeTypeCreateModal = this.renderCafeTypeCreateModal.bind(this);
	}

	renderCafeTypeCreateModal = () => {
		const {
			isModalOpen,
			toggleModal,
			cafeTypeCreate,
			handleInputChange,
			handleNewCafeTypeSubmit
		} = this.props;

		return (
			<Modal
				isOpen={isModalOpen.cafeTypeCreate}
				toggle={() => toggleModal('cafeTypeCreate')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Buat Kategori Cafe Baru</h6>
				</ModalHeader>
				<Form onSubmit={handleNewCafeTypeSubmit}>
					<ModalContent>
						<FormGroup>
							<Label htmlFor="name" className="fw-semibold">Nama Kategori Cafe</Label>
							<Input
								type="text"
								name="name"
								placeholder="Masukkan nama kategori cafe baru"
								onChange={(e) => handleInputChange(cafeTypeCreate, e)}
								required="true"
								autoFocus
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex justify-content--flex-end">
						<Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('cafeTypeCreate')}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button buttonTheme="primary" className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
						</Button>
					</ModalFooter>
				</Form>
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
			handleNewCafeType
		} = this.props;

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h5 className="fw-semibold">Daftar Cafe</h5>
					<Button type="button" buttonTheme="primary" className="clr-light" onClick={handleNewCafeType}>
						<small className="fw-semibold tt-uppercase ls-base">Pengaturan</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{cafeTypes.length ? cafeTypes.map(this.renderTabNav) : null}
				</Nav>
				{cafeTypes.length ? cafeTypes.map(this.renderTabContent) : null}
				{this.renderCafeTypeCreateModal()}
			</div>
		);
	}
}

export default SettingsCafe;
