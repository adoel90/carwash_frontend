import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	getAllUser,
	createUser,
	updateUser,
	changeUserStatus,
} from '../actions/user.action';

import {
	getAllAccess
} from '../actions/access.action';

import {
	getCafeTypes
} from '../actions/cafe.action';

import { SettingsUser } from '../components/Settings';

class SettingsUserContainer extends Component {
	constructor() {
		super();
		this.getAllUser = this.getAllUser.bind(this);
		this.getAllAccess = this.getAllAccess.bind(this);
		this.getCafeTypes = this.getCafeTypes.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleUpdateUserSubmit = this.handleUpdateUserSubmit.bind(this);
		this.handleChangeUserStatus = this.handleChangeUserStatus.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
		this.state = {
			userList: [],
			accessList: [],
			cafeTypes: [],
			search: {
				searchText: '',
				searchBy: 'name'
			},
			selectedUser: {},
			newUser: {
				username: '',
				password: '',
				confirmPassword: '',
				name: '',
				email: '',
				level: 0,
				cafe: 0
			},
			isModalOpen: {
				updateUser: false
			}
		}
	}

	/** Lifecycle methods */
	componentDidMount = () => {
		this.getAllUser();
		this.getAllAccess();
		this.getCafeTypes();
	}

	componentDidUpdate = (prevProps) => {
		const {
			userList
		} = this.state;

		const {
			user,
			access,
			cafe,
			toggleDialog
		} = this.props;
		
		if(prevProps.user !== user) {
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

			if(prevProps.user.new !== user.new) {
				if(user.new.isCreated) {
					let dialogData = {
						type: 'success',
						title: 'Berhasil!',
						message: 'User telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
						onClose: () => window.location.reload(),
						closeText: 'Kembali'
					}

					toggleDialog(dialogData);
				}
			}
			
			if(prevProps.user.existing !== user.existing) {
				if(user.existing.isUpdated) {
					let dialogData = {
						type: 'success',
						title: 'Berhasil!',
						message: 'User telah berhasil diperbarui. Klik tombol berikut untuk kembali.',
						onClose: () => window.location.reload(),
						closeText: 'Kembali'
					}

					toggleDialog(dialogData);
				}
			}

		}

		if(prevProps.access.list !== access.list) {
			this.setState({
				accessList: access.list
			}, () => {
				this.forceUpdate();
			});
		}

		if(prevProps.cafe.types !== cafe.types) {
			this.setState({
				cafeTypes: cafe.types
			}, () => {
				this.forceUpdate();
			})
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

	getCafeTypes = () => {
		const {
			accessToken,
			dispatch
		} = this.props;
		
		dispatch(getCafeTypes(accessToken));
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

		let userCopy = Object.assign({}, user);

		this.setState({
			selectedUser: {
				id: userCopy.id,
				name: userCopy.name,
				username: userCopy.username,
				email: userCopy.email,
				level: userCopy.level.id,
				cafe: userCopy.cafe || 0
			}
		}, () => {
			this.toggleModal('updateUser');
		})
	}

	handleUpdateUserSubmit = (e) => {
		e.preventDefault();

		const {
			selectedUser
		} = this.state;

		const {
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			id: selectedUser.id,
			name: selectedUser.name,
			username: selectedUser.username,
			password: selectedUser.password,
			email: selectedUser.email,
			level: selectedUser.level,
			cafe: selectedUser.cafe
		}

		dispatch(updateUser(requiredData, accessToken));
	}

	handleChangeUserStatus = () => {
		const {
			user,
			dispatch,
			accessToken
		} = this.props;

		/** Remaining codes for handling user status change */
	}

	handleCreateUser = () => {
		this.setState({
			newUser: {}
		})
		
		this.toggleModal('createUser');
	}

	handleCreateUserSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			newUser
		} = this.state;
		
		if(newUser.password == newUser.confirmPassword) {
			let requiredData = {
				name: newUser.name,
				username: newUser.username,
				password: newUser.password,
				email: newUser.email,
				level: newUser.level,
				cafe: newUser.cafe
			}
			
			dispatch(createUser(requiredData, accessToken));
		}
		else {
			let errorData = {
				message: 'Password tidak sesuai dengan konfirmasi password.'
			}
			
			this.setState({
				...this.state,
				newUser: {
					...this.state.newUser,
					error: errorData
				}
			}, () => {
				this.forceUpdate();
			})
		}
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
				handleCreateUserSubmit={this.handleCreateUserSubmit}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		access: state.access,
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(SettingsUserContainer);