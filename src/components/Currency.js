import React from 'react';
import NumberFormat from 'react-number-format';

class Currency extends React.Component {
	render() {
		return (
			<NumberFormat
				value={this.props.value}
				displayType={'text'}
				thousandSeparator={true}
				prefix={'Rp' + ' '}
			/>
		)
	}
}

export default Currency;
