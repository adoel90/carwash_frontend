import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogout } from '../actions/user.action.js';

class LogoutContainer extends Component {
	componentWillReceiveProps = (nextProps) => {
		console.log(nextProps);
	}

	componentDidMount = (prevProps) => {
		const {
			dispatch
		} = this.props;

		dispatch(userLogout());

		// this.props.userLogout();
	}

	render() {
		return null;
	}

}

const mapDispatchToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

export default connect(mapDispatchToProps)(LogoutContainer);
