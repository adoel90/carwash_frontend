import React from 'react';
import Cafe from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action.js';

class CafeContainer extends React.Component {
	componentDidMount = () => {
		this.props.getCafeTypes();
	}

	render() {
		console.log(this.props);

		// return null;
		return this.props.cafe.isLoaded
		? <Cafe {...this.state} {...this.props} />
		: null
	}
}

const mapStateToProps = (state, props) => {
	return {
		cafe: state.cafe
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCafeTypes: () => dispatch(getCafeTypes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeContainer);
