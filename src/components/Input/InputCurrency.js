import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class InputCurrency extends Component {
	render() {
		const {
			...rest
		} = this.props;

		return (
			<NumberFormat
				className="form-control"
				displayType={'input'}
				thousandSeparator={true}
				prefix={'Rp '}
				{...rest}
			/>
		);
	}

}

export default InputCurrency;
