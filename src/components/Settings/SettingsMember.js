import React from 'react';

import { connect } from 'react-redux';
import { getMemberList } from '../../actions/member.action';
import SearchBar from '../SearchBar';

import { PageBlock } from '../Page';
import { Table } from 'reactstrap';

class SettingsMember extends React.Component {
	constructor() {
		super();
		this.state = {
			tableHeadings: [
				{ id: 1, name: 'Nama Customer' },
				{ id: 2, name: 'Alamat E-mail' },
				{ id: 3, name: 'Alamat' },
				{ id: 4, name: 'No. Telepon' },
				{ id: 5, name: 'Tipe Member' }
			],
			searchVal: ''
		}

		this.renderTableHeadings = this.renderTableHeadings.bind(this);
		this.renderMemberList = this.renderMemberList.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleSearchChange = (e) => {
		this.setState({
			searchVal: e.target.value
		})
	}

	handleSearchSubmit = (e) => {
		e.preventDefault();

		const requiredData = {
			member: this.state.searchVal,
			limit: 10,
			offset: 0
		}


	}

	renderMemberList = (member, i) => {
		return (
			<tr key={i}>
				<td>{member.name}</td>
				<td>{member.email}</td>
				<td>{member.address}</td>
				<td>{member.phone}</td>
				<td>{member.card.type.name}</td>
			</tr>
		)
	}

	renderTableHeadings = (heading, i) => {
		return (
			<th>{heading.name}</th>
		)
	}

	render() {
		const { member } = this.props;
		const { searchVal } = this.state;

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Member</h5>
					{/* <p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p> */}
				</div>
				<div className="padding-bottom-2">
					<SearchBar
						onSubmit={this.handleSearchSubmit}
						onChange={this.handleSearchChange}
						placeholder="Cari member..."
						value={searchVal}
					/>
				</div>
				<PageBlock className="margin-bottom-5">
					<Table>
						<thead>
							<tr>
								{ this.state.tableHeadings.map(this.renderTableHeadings) }
							</tr>
						</thead>
						<tbody>
							{ member.memberList ? member.memberList.member.map(this.renderMemberList) : <p>Sedang dimuat...</p> }
						</tbody>
					</Table>
				</PageBlock>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { accessToken } = ownProps;
	const requiredData = {
		limit: 10,
		offset: 0
	}

	return {
		getMemberList: dispatch(getMemberList(requiredData, accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMember);