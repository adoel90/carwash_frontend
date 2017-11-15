import React, { Component } from 'react';
import { Table, Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { Form, FormGroup } from '../Form';
import { Input, Label } from '../Input';
import { Button, ButtonGroup } from '../Button';
import { TabContent } from '../Tab';
import { PropsRoute } from '../Route';

import SettingsServiceTypeContainer from '../../containers/SettingsServiceTypeContainer';

class SettingsService extends Component {
	constructor() {
		super();
		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
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
					onClick={() => toggleTab(i)}
				>
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

		console.log(serviceTypes);

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h5 className="fw-semibold">Daftar Service</h5>
					<Button type="button" buttonTheme="primary" buttonSize="small" className="clr-light" onClick={handleNewServiceType}>
						<small className="fw-semibold tt-uppercase ls-base">Tambah Kategori Service</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{serviceTypes.length ? serviceTypes.map(this.renderTabNav) : null}
				</Nav>
				{ serviceTypes.length ? serviceTypes.map(this.renderTabContent) : null}
			</div>
		);
	}
}

export default SettingsService;
