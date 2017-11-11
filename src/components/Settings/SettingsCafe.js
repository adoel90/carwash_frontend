import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { Button, ButtonGroup } from '../Button';
import { TabContent } from '../Tab';
import { PropsRoute } from '../Route';

import SettingsCafeTypeContainer from '../../containers/SettingsCafeTypeContainer';

class SettingsCafe extends Component {
	constructor() {
		super();
		this.state = {
			activeTab: 0
		}

		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
	}

	toggleTab = (index) => {
		this.setState({
			activeTab: index
		})
	}

	renderTabContent = (type, i) => {
		const { match } = this.props;

		return (
			<TabContent activeTab={this.state.activeTab} tabIndex={i}>
				<PropsRoute
					path={`${match.url}/${i}`}
					component={SettingsCafeTypeContainer}
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

	render() {
		const {
			cafe
		} = this.props;

		return (
			<div className="inner-view">
				<div className="flex justify-content--space-between padding-bottom-2">
					<h5 className="fw-semibold">Daftar Cafe</h5>
					<Button type="button" buttonTheme="primary" buttonSize="small">
						<small className="fw-semibold tt-uppercase ls-base">Tambah Cafe</small>
					</Button>
				</div>
				<Nav tabs className="flex justify-content--space-between">
					{cafe.types.length ? cafe.types.map(this.renderTabNav) : null }
				</Nav>
				{ cafe.types.length ? cafe.types.map(this.renderTabContent) : null }
			</div>
		);
	}

}

export default SettingsCafe;
