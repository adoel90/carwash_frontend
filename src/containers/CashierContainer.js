import React from 'react';
import { connect } from 'react-redux';
import { Cashier } from '../components/Cashier';
import { CashierNewCard, CashierTopUp } from '../components/Cashier';
import CashierTopUpContainer from '../containers/CashierTopUpContainer';
import CashierNewCardContainer from '../containers/CashierNewCardContainer';
import { resetMemberData } from '../actions/member.action';

class CashierContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			subRoutes: [
				{ id: 1, name: 'Isi Ulang', component: CashierTopUpContainer },
				{ id: 2, name: 'Kartu Baru', component: CashierNewCardContainer }
			],
		}
	}

	render() {
		return (
			<Cashier
				{...this.props}
				{...this.state}
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
