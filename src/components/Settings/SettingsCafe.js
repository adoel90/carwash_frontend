import React, { Component } from 'react';

class SettingsCafe extends Component {
	constructor() {
		super();
		this.renderTabNav = this.renderTabNav.bind(this);
		this.renderTabContent = this.renderTabContent.bind(this);
	}

	renderTabNav = () => {

	}

	renderTabContent = () => {
		
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
