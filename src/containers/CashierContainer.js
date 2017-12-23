import React from 'react';
import { connect } from 'react-redux';
import { Cashier } from '../components/Cashier';
import { CashierNewCard, CashierTopUp } from '../components/Cashier';
import CashierTopUpContainer from '../containers/CashierTopUpContainer';
import CashierNewCardContainer from '../containers/CashierNewCardContainer';
import CashierRefundContainer from '../containers/CashierRefundContainer';
import { resetMemberData } from '../actions/member.action';
import {
	showDialog,
	hideDialog
} from '../actions/dialog.action';

class CashierContainer extends React.Component {
	constructor() {
		super();
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.state = {
			subRoutes: [
				{ id: 1, name: 'Isi Ulang', component: CashierTopUpContainer },
				{ id: 2, name: 'Kartu Baru', component: CashierNewCardContainer },
				{ id: 3, name: 'Refund Kartu', component: CashierRefundContainer }
			],
		}
	}

	toggleDialog = (data) => {
		const {
			dialog
		} = this.props;

		if(!dialog.isOpened) {
			this.showDialog(data);
		}
		else {
			this.hideDialog();
		}
	}

	showDialog = (data) => {
		const {
			dispatch
		} = this.props;

		dispatch(showDialog(data));
	}

	hideDialog = () => {
		const {
			dispatch
		} = this.props;

		dispatch(hideDialog());
	}

	render() {
		return (
			<Cashier
				{...this.props}
				{...this.state}
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

export default connect(mapStateToProps)(CashierContainer);
