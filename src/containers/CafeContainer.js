import React from 'react';
import { Cafe } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action.js';

class CafeContainer extends React.Component {
	componentDidMount = () => {
		this.props.getCafeTypes();
	}

	render() {
		return this.props.cafe.isLoaded
		? <Cafe {...this.state} {...this.props} />
		: null
	}
}

const mapStateToProps = (state, props) => {
	return {
		cafe: state.cafe,
		cafeTypes: state.cafe.types
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { accessToken } = ownProps;

	return {
		getCafeTypes: () => dispatch(getCafeTypes(accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeContainer);
