import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';
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
			service
		} = this.props

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h5 className="fw-semibold">Daftar Service</h5>
					<Button type="button" buttonTheme="primary" buttonSize="small">
						<small className="fw-semibold tt-uppercase ls-base">Tambah Daftar Layanan</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{service.types.length ? service.types.map(this.renderTabNav) : null }
				</Nav>
				{ service.types.length ? service.types.map(this.renderTabContent) : null }
			</div>
		);
	}
}

export default SettingsService;
