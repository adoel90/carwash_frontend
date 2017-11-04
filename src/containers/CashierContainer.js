import React from 'react';
import { Cashier } from '../components/Cashier';
import { CashierNewCard, CashierTopUp } from '../components/Cashier';

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

	render() {
		return (
			<Cashier {...this.props} {...this.state} />
		)
	}
}

export default CashierContainer;
