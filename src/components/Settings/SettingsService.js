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
		this.state = {
			activeTab: 0
		}

		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
		this.renderNewServiceTypeModal = this.renderNewServiceTypeModal.bind(this);
		this.handleNewServiceTypeSubmit = this.handleNewServiceTypeSubmit.bind(this);
	}

	handleNewServiceTypeSubmit = (e) => {
		e.preventDefault();
		this.props.handleNewServiceType();
	}

	renderNewServiceTypeModal = () => {
		const {
			isModalOpen,
			toggleModal,
			handleInputChange
		} = this.props;

		return (
			<Modal isOpen={isModalOpen} toggle={toggleModal}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Tambah Tipe Service</h6>
				</ModalHeader>
				<Form onSubmit={this.handleNewServiceTypeSubmit}>
					<ModalContent>
						<FormGroup>
							<Label className="fw-semibold">Nama Tipe Service</Label>
							<Input
								name="name"
								type="text"
								placeholder="Masukkan nama tipe service baru"
								onChange={handleInputChange}
								autoFocus="true"
							/>
						</FormGroup>
					</ModalContent>
					<ModalFooter className="flex">
						<Button type="button" buttonTheme="danger" buttonSize="small" buttonFull className="margin-right-2" onClick={toggleModal}>
							<small className="fw-semibold tt-uppercase ls-base">Batal</small>
						</Button>
						<Button buttonTheme="primary" buttonSize="small" buttonFull>
							<small className="fw-semibold tt-uppercase ls-base">Simpan</small>
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderTabContent = (type, i) => {
		const { match } = this.props;

		return (
			<TabContent activeTab={this.state.activeTab} tabIndex={i}>
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
		return (
			<NavItem>
				<NavTabLink active={this.state.activeTab === i} onClick={this.toggleTab.bind(this, i)}>{type.name}</NavTabLink>
			</NavItem>
		)
	}

	toggleTab = (index) => {
		this.setState({
			activeTab: index
		})
	}

	render() {
		const {
			service,
			toggleModal
		} = this.props

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h5 className="fw-semibold">Daftar Service</h5>
					<Button type="button" buttonTheme="primary" buttonSize="small" onClick={toggleModal}>
						<small className="fw-semibold tt-uppercase ls-base">Tambah Tipe Service</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{service.types.length ? service.types.map(this.renderTabNav) : null }
				</Nav>
				{ service.types.length ? service.types.map(this.renderTabContent) : null }
				{ this.renderNewServiceTypeModal() }
			</div>
		);
	}
}

export default SettingsService;
