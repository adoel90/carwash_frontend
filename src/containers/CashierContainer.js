import React from 'react';
import Cashier from '../components/Cashier';

class CashierContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            sidenavItems: [
				{ title: 'Pendaftaran', path: '/cashier/register' },
				{ title: 'Topup', path: '/cashier/topup' },
				{ title: 'Ganti Kartu', path: '/cashier/change-card' }
			]
        }
    }
    render() {
        return(
            <Cashier {...this.props} {...this.state} />
        )
    }
}

export default CashierContainer;
