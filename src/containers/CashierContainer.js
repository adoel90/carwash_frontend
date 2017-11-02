import React from 'react';
import { Cashier } from '../components/Cashier';
import { CashierNewCard, CashierTopUp, CashierChangeCard } from '../components/Cashier';

class CashierContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			subRoutes: [
				{ id: 1, name: 'Pendaftaran Kartu', component: CashierNewCard },
				{ id: 2, name: 'Isi Ulang', component: CashierTopUp },
				{ id: 3, name: 'Ganti Kartu', component: CashierChangeCard }
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
