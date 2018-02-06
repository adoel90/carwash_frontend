import React, { Component } from 'react';
import { SettingsManageCafeType } from '../Settings';

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

	renderTabContent = () => {
		const {
			match,
			activeTab,
			cafe,
			cafeTypes,
		} = this.props;

		// cafe.types.isLoaded ? cafeTypes.active.map(this.renderTabContent) : null

		if(cafe.types.isLoaded) {
			if(cafeTypes.active.length) {
				return cafeTypes.active.map((type, i) => {
					return (
						<TabContent activeTab={activeTab} tabIndex={i}>
							<PropsRoute
								component={SettingsCafeTypeContainer}
								type={type}
								{...this.props}
							/>
						</TabContent>
					)
				})
			}
			else {
				return (
					<PageBlock className="ta-center">
						<p>Silahkan klik tombol pengaturan untuk membuat kategori cafe terlebih dahulu untuk bisa menambahkan menu.</p>
					</PageBlock>
				)
			}
		}

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
				{this.renderTabContent()}
				<SettingsManageCafeType {...this.props} />
			</div>
		);
	}
}

export default SettingsCafe;
