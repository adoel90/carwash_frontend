import React, { Component } from 'react';
import { PageBlock, PageBlockGroup } from '../Page';
import { TableSet } from '../Table';
import { SettingsServiceList } from '../Settings';
import { Button } from '../Button';

class SettingsServiceType extends Component {
	constructor() {
		super();
		this.renderServiceList = this.renderServiceList.bind(this);
	}

	renderServiceList = () => {
		const {
			type,
			service,
			serviceList
		} = this.props;


		if(service.isLoaded) {
			if(serviceList.length) {
				return <SettingsServiceList {...this.props} />
			}
			else {
				return (
					<div className="flex justify-content--center flex-column ta-center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Maaf, sistem tidak dapat menemukan daftar service untuk kategori <span className="fw-semibold">{type.name}</span>. <br /> Silahkan klik tombol di bawah untuk menambahkan menu baru.</p>
					</div>
				)
			}
		}

	}

	render() {
		const {
			type,
			service,
			handleNewService
		} = this.props;

		return (
			<PageBlockGroup>
				<PageBlock>
					{ this.renderServiceList() }
				</PageBlock>
				<PageBlock className="flex justify-content--flex-end" extension>
					<Button type="button" buttonTheme="primary" className="clr-light" onClick={() => handleNewService(type)}>
						<small className="fw-semibold tt-uppercase ls-base">Buat Service Baru</small>
					</Button>
				</PageBlock>
			</PageBlockGroup>
		);
	}

}

export default SettingsServiceType;
