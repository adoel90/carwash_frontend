import React from 'react';
import { CafeType } from '../components/Cafe';

import { connect } from 'react-redux';
import { getCafeMenuList } from '../actions/cafe.action';

class CafeTypeContainer extends React.Component {
	componentDidMount = () => {
		this.props.getCafeMenuList();
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
	const { accessToken, type } = ownProps;
	const requiredData = {
		cafe: type.id,
		limit: 10,
		offset: 0,
		name: ''
	}

	return {
		getCafeMenuList: () => dispatch(getCafeMenuList(requiredData, accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeTypeContainer);
