import React from 'react';

import { connect } from 'react-redux';
import { getMemberList } from '../../actions/member.action';

import { PageBlock } from '../Page';
import { Table } from 'reactstrap';

class SettingsMember extends React.Component {
	constructor() {
		super();
		this.state = {
			tableHeadings: [
				{ id: 1, name: 'Customer' },
				{ id: 2, name: 'Tanggal Dibuat' },
				{ id: 3, name: 'E-mail' },
				{ id: 4, name: 'Alamat' }
			]
		}

		this.renderTableHeadings = this.renderTableHeadings.bind(this);
	}

	renderTableHeadings = (heading, i) => {
		return (
			<th>{heading.name}</th>
		)
	}

	render() {
		const { member } = this.props; 

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h5 className="fw-semibold">Daftar Member</h5>
					{/* <p className="clr-passive">Masukkan data customer baru dengan benar dan lengkap. Seluruh kolom harus diisi.</p> */}
				</div>
				<PageBlock className="margin-bottom-5">
					<Table>
						<thead>
							<tr>
								{ this.state.tableHeadings.map(this.renderTableHeadings) }
							</tr>
						</thead>
						<tbody>
							{ this.props.member.memberList.member}
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