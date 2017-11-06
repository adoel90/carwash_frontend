import React, { Component } from 'react';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';

class SettingsService extends Component {
	constructor() {
		super();
		this.state = {
			activeTab: 1
		}
	}

	toggleTab = (index) => {
		this.setState({
			activeTab: index
		})
	}

	render() {
		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Service</h5>
				</div>
				<Nav tabs>
					<NavItem>
						<NavTabLink active={this.state.activeTab === 1} onClick={this.toggleTab.bind(this, 1)}>Lunch</NavTabLink>
					</NavItem>
					<NavItem>
						<NavTabLink active={this.state.activeTab === 2} onClick={this.toggleTab.bind(this, 2)}>Dinner</NavTabLink>
					</NavItem>
				</Nav>
				<PageBlock>

				</PageBlock>
			</div>
		);
	}

}

export default SettingsService;
