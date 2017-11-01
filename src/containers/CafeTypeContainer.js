import React from 'react';
import { CafeType } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeMenu } from '../actions/cafe.action';

class CafeTypeContainer extends React.Component {
	componentDidMount = () => {
		this.props.getCafeMenu();
	}

	render() {
		return <CafeType {...this.state} {...this.props} />;
	}
}

const mapStateToProps = (state) => {
	const cafe = state.cafe;
	const cafeMenu = state.cafe.menu.menu;

	return {
		cafe,
		cafeMenu
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(ownProps);

	const { accessToken, type } = ownProps;
	const requiredData = {
		cafe: type.id,
		limit: 10,
		offset: 0,
		name: ''
	}

	return {
		getCafeMenu: () => dispatch(getCafeMenu(requiredData, accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeTypeContainer);
