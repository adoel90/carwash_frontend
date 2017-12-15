import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
	getAllUser,
	updateUser,
	changeUserStatus
} from '../actions/user.action';

import { SettingsUser } from '../components/Settings';

class SettingsUserContainer extends Component {
	constructor() {
		super();
		this.getAllUser = this.getAllUser.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
		this.state = {
			userList: [],
			search: {
				searchText: '',
				searchBy: 'name'
			}
		}
	}

	/** Lifecycle methods */
	componentDidMount = () => {
		this.getAllUser();
	}

	componentDidUpdate = (prevProps) => {
		const {
			userList
		} = this.state;

		const {
			user
		} = this.props;
		
		if(prevProps.user.list !== user.list) {
			console.log(user);
			
			// user.list.data.forEach((item) => {
			// 	item.levelId = item.level.id;
			// 	item.levelName = item.level.name;
			// })
			
			// this.setState({
			// 	userList: user.list
			// }, () => {
			// 	this.forceUpdate();
			// });
		}
	}

	getAllUser = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getAllUser(accessToken));
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
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
				handleInputChange={this.handleInputChange}
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