import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogout } from '../actions/user.action';

class LogoutContainer extends Component {
	constructor() {
		super();
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidUpdate = (prevProps) => {
		const {
			user
		} = this.props;
		
		if(prevProps.user.item !== user.item) {
			window.location.reload();
		}
	}
	
	componentWillMount = () => {
		this.handleLogout();
	}

	handleLogout = () => {
		const {
			dispatch
		} = this.props;
		
		dispatch(userLogout());
	}


	render() {
		return null;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
 
export default connect(mapStateToProps)(LogoutContainer);
