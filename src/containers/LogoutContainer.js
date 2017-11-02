import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/user.action.js';

class LogoutContainer extends Component {
	componentDidMount = () => {
		this.props.logout();
	}

	render() {
		return null
	}

}

const mapDispatchToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

export default connect(mapDispatchToProps, { logout })(LogoutContainer);
