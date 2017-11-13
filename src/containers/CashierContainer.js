import React from 'react';
import { connect } from 'react-redux';
import { Cashier } from '../components/Cashier';
import { CashierNewCard, CashierTopUp } from '../components/Cashier';
import { resetMemberData } from '../actions/member.action';

class CashierContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			subRoutes: [
				{ id: 1, name: 'Isi Ulang', component: CashierTopUp },
				{ id: 2, name: 'Kartu Baru', component: CashierNewCard }
			]
		}
	}

	componentDidMount = () => {
		const { dispatch } = this.props;

		dispatch(resetMemberData());
	}

	render() {
		return (
			<Cashier {...this.props} {...this.state} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

export default connect(mapStateToProps)(CashierContainer);
