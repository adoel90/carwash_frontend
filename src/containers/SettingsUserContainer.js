import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../actions/user.action';

import { SettingsUser } from '../components/Settings';

class SettingsUserContainer extends Component {
	constructor() {
		super();
		this.getUserList = this.getUserList.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
		this.state = {
			userList: []
		}
	}

	/** Lifecycle methods */
	componentDidMount = () => {
		this.getUserList();
	}

	componentDidUpdate = (prevProps) => {
		const {
			userList
		} = this.state;

		const {
			user
		} = this.props;
		
		if(prevProps.user.list !== user.list) {
			user.list.data.forEach((item) => {
				item.levelId = item.level.id;
				item.levelName = item.level.name;
			})
			
			this.setState({
				userList: user.list
			}, () => {
				this.forceUpdate();
			});
		}
	}

	getUserList = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			limit: null,
			offset: null
		}

		dispatch(getUserList(requiredData, accessToken));
	}

	handleUpdateUser = () => {
	}

	handleDeleteUser = () => {
		
	}

	render() {
		return (
			<SettingsUser
				{...this.state}
				{...this.props}
				handleUpdateUser={this.handleUpdateUser}
				handleDeleteUser={this.handleDeleteUser}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(SettingsUserContainer);