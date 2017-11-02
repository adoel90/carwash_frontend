import React from 'react';
import { Login } from '../components/Login';

import { connect } from 'react-redux';
import { login } from '../actions/user.action.js';

class LoginContainer extends React.Component {
	render() {
		return (
			<Login {...this.state} {...this.props} />
		)
	}
}

const mapDispatchToProps = (state) => {
	return {
		authentication: state.authentication
	}
}

export default connect(mapDispatchToProps)(LoginContainer);
