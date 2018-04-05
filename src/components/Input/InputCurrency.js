import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class InputCurrency extends Component {
	render() {
		const {
			...rest
		} = this.props;

		return (
			<NumberFormat
				className={rest.className}
				displayType={'input'}
				thousandSeparator={true}
				{...rest}
			/>
		);
	}

}

export default InputCurrency;
