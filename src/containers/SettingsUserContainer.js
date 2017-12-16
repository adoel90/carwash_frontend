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
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleUpdateUserSubmit = this.handleUpdateUserSubmit.bind(this);
		this.handleChangeUserStatus = this.handleChangeUserStatus.bind(this);
		this.state = {
			userList: [],
			search: {
				searchText: '',
				searchBy: 'name'
			},
			selectedUser: {},
			isModalOpen: {
				updateUser: false
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

	getAllUser = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getAllUser(accessToken));
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
			dispatch(getAllAccess(accessToken));
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

	render() {
		return (
			<SettingsUser
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleUpdateUser={this.handleUpdateUser}
				handleUpdateUserSubmit={this.handleUpdateUserSubmit}
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