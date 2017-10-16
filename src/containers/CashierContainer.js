import React from 'react';
import Cashier from '../components/Cashier';

export default class CashierContainer extends React.Component {
	render() {
		return(
			<Cashier
				{...this.state}
				{...this.props}
			/>
		)
	}
}
