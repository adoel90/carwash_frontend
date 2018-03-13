import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getMemberDetail } from '../actions/member.action';
import { getMemberDetail } from '../../../actions/member.action';

import { Profile } from '../../../components/Profile';
import ProfileAccountContainer from './ProfileAccountContainer';
import ProfileTransactionContainer from './ProfileTransactionContainer';
// import { showDialog, hideDialog } from '../actions/dialog.action';
import { showDialog, hideDialog } from '../../../actions/dialog.action';


class ProfileContainer extends Component {
	
	constructor() {

		super();
		this.state = {
			submodules: [
				{ name: 'Informasi Akun', path: 'account', component: ProfileAccountContainer },
				{ name: 'Daftar Transaksi', path: 'transaction', component: ProfileTransactionContainer }
			]
		}

		this.getMemberDetail = this.getMemberDetail.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
	}

	componentDidMount = () => {
		this.getMemberDetail();
	}

	componentDidUdpate = (prevProps) => {
		const {
			member
		} = this.props;

		if(prevProps.member.item !== member.item) {

		}
	}

	getMemberDetail = () => {
		const {
			// memberData,
			member,
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			// id: memberData.id,
			id: member.id,
			transaction: true
		}

		// dispatch(getMemberDetail(requiredData, accessToken));
	}

	toggleDialog = (data) => {
		const {
			dialog,
			dispatch
		} = this.props;

		if(!dialog.isOpened) {
			this.showDialog(data);
		}
		else {
			this.hideDialog();
		}
	}

	showDialog = (data) => {
		const { dialog, dispatch } = this.props;

		// dispatch(showDialog(data))
	}

	hideDialog = () => {
		const { dialog, dispatch } = this.props;

		// dispatch(hideDialog());
	}

	addPathPropToTypes = () => {
		const {
			service
		} = this.props;

		service.types.map((type, i) => {
			return type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}


	render() {
		return (
			<Profile
				{...this.state}
				{...this.props}
				toggleDialog={this.toggleDialog}
				showDialog={this.showDialog}
				hideDialog={this.hideDialog}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member,
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(ProfileContainer);
