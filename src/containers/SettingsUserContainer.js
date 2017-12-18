import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	getAllUser,
	updateUser,
	changeUserStatus
} from '../actions/user.action';

import {
	getAllAccess
} from '../actions/access.action';

import { SettingsUser } from '../components/Settings';

class SettingsUserContainer extends Component {
	constructor() {
		super();
		this.getAllUser = this.getAllUser.bind(this);
		this.getAllAccess = this.getAllAccess.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleUpdateUserSubmit = this.handleUpdateUserSubmit.bind(this);
		this.handleChangeUserStatus = this.handleChangeUserStatus.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.state = {
			userList: [],
			accessList: [],
			search: {
				searchText: '',
				searchBy: 'name'
			},
			selectedUser: {},
			newUser: {},
			isModalOpen: {
				updateUser: false
			}
		}
	}

	/** Lifecycle methods */
	componentDidMount = () => {
		this.getAllUser();
		this.getAllAccess();
	}

	componentDidUpdate = (prevProps) => {
		const {
			userList
		} = this.state;

		const {
			user,
			access
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

		if(prevProps.access.list !== access.list) {
			this.setState({
				accessList: access.list
			}, () => {
				this.forceUpdate();
			});
		}
	}

	getAllUser = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getAllUser(accessToken));
	}

	getAllAccess = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getAllAccess(accessToken));
	}

	toggleModal = (name) => {
		const { isModalOpen } = this.state;

		this.setState({
			isModalOpen: {
				...isModalOpen,
				[name]: !isModalOpen[name]
			}
		})
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

	handleUpdateUser = (user) => {
		const {
			dispatch,
			accessToken
		} = this.props;

		this.setState({
			selectedUser: user
		}, () => {
			this.toggleModal('updateUser');
		})
	}

	handleUpdateUserSubmit = (e) => {
		e.preventDefault();
	}

	handleChangeUserStatus = () => {
		const {
			user,
			dispatch,
			accessToken
		} = this.props;

		/** Remaining codes for handling user status change */
	}

	handleCreateUser = (e) => {
		this.toggleModal('createUser');
	}

	render() {
		return (
			<SettingsUser
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleUpdateUser={this.handleUpdateUser}
				handleUpdateUserSubmit={this.handleUpdateUserSubmit}
				handleCreateUser={this.handleCreateUser}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		access: state.access
	}
}

export default connect(mapStateToProps)(SettingsUserContainer);