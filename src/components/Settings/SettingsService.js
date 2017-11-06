import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { PageBlock } from '../Page';
import { Nav, NavTabLink, NavItem } from '../Nav';
import { Button, ButtonGroup } from '../Button';

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
				<div className="flex justify-content--space-between">
					<Nav tabs className="flex justify-content--space-between">
						<NavItem>
							<NavTabLink active={this.state.activeTab === 1} onClick={this.toggleTab.bind(this, 1)}>Lunch</NavTabLink>
						</NavItem>
						<NavItem>
							<NavTabLink active={this.state.activeTab === 2} onClick={this.toggleTab.bind(this, 2)}>Dinner</NavTabLink>
						</NavItem>
					</Nav>
					<Button buttonTheme="primary" buttonSize="small">
						<small className="fw-semibold tt-uppercase ls-base">Tambah Submenu</small>
					</Button>
				</div>
				<PageBlock>
					<Table>
						<thead>
							<tr>
								<th>Nama Menu</th>
								<th>Harga (dalam Rp)</th>
								<th>Deskripsi Menu</th>
								<th>Aksi</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Mie Goreng</td>
								<td>45.000</td>
								<td>Mie Goreng dengan taburan bawang goreng lezat tersaji dalam 3 varian rasa.</td>
								<td className="flex">
									<ButtonGroup>
										<Button buttonTheme="primary" buttonSize="small">
											<small className="tt-uppercase fw-semibold ls-base">Ubah</small>
										</Button>
										<Button buttonTheme="danger" buttonSize="small">
											<small className="tt-uppercase fw-semibold ls-base">Hapus</small>
										</Button>

									</ButtonGroup>
								</td>
							</tr>
						</tbody>
					</Table>
				</PageBlock>
			</div>
		);
	}
}

export default SettingsService;
