import React from 'react';
import { Cafe } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action.js';

class CafeContainer extends React.Component {
	componentDidMount = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getCafeTypes(accessToken));
	}

	render() {
		const {
			cafe
		} = this.props;

		return cafe.isLoaded
		? <Cafe {...this.state} {...this.props} />
		: null
	}
}

const mapStateToProps = (state, props) => {
	return {
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(CafeContainer);
