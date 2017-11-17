import React from 'react';
import { Cafe } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action.js';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.getCafeTypes = this.getCafeTypes.bind(this);
	}

	componentDidMount = () => {
		this.getCafeTypes();
	}

	getCafeTypes = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getCafeTypes(accessToken));
	}

	render() {
		return (
			<Cafe
				{...this.props}
				{...this.state}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeTypes: state.cafe.types
	}
}

export default connect(mapStateToProps)(CafeContainer);
