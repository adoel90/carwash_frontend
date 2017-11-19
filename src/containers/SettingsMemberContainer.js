import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getMemberList,
	getAllMemberList,
	updateMember,
	deleteMember
} from '../actions/member.action';
import { toggleDialog } from '../actions/dialog.action';
import { SettingsMember } from '../components/Settings';

class SettingsMemberContainer extends Component {
	constructor() {
		super();
		this.state = {
			searchText: '',
			selectedMember: {
				name: '',
				email: '',
				phone: '',
				address: ''
			},
			isModalOpen: {
				editMember: false,
				deleteMember: false
			}
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.getMemberList = this.getMemberList.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateMember = this.handleUpdateMember.bind(this);
		this.handleUpdateMemberSubmit = this.handleUpdateMemberSubmit.bind(this);
		this.handleDeleteMember = this.handleDeleteMember.bind(this);
		this.handleDeleteMemberSubmit = this.handleDeleteMemberSubmit.bind(this);
	}

	componentDidMount = () => {
		this.getMemberList();
	}

	componentDidUpdate = (prevProps) => {
		const {
			dialog,
			dispatch,
			member
		} = this.props;

		if(prevProps.member !== this.props.member) {
			let dialogData = {
				success: {
					type: 'success',
					title: '',
					message: '',
					close: () => {
						window.location.reload()
					},
					closeText: 'Tutup'
				}
			}

			if(member.isUpdated) {
				dialogData.success.title = 'Berhasil';
				dialogData.success.message = 'Data member telah berhasil diubah. Klik tombol berikut untuk kembali.';

				dispatch(toggleDialog(dialogData.success, false));
			}

			else if(member.isDeleted) {
				dialogData.success.title = 'Berhasil';
				dialogData.success.message = 'Penghapusan member telah berhasil. Klik tombol berikut untuk kembali.';

				dispatch(toggleDialog(dialogData.success, false));
			}
		}
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
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

	handleUpdateMember = (member) => {
		this.setState({
			selectedMember: {
				id: member.id,
				name: member.name,
				email: member.email,
				phone: member.phone,
				address: member.address
			}
		})

		this.toggleModal('editMember');
	}

	handleUpdateMemberSubmit = (e) => {
		e.preventDefault();

		const {
			member,
			memberList,
			accessToken,
			dispatch
		} = this.props;

		const {
			selectedMember
		} = this.state;

		let requiredData = {
			id: selectedMember.id,
			name: selectedMember.name,
			phone: selectedMember.phone,
			email: selectedMember.email,
			address: selectedMember.address
		}

		dispatch(updateMember(requiredData, accessToken));
	}

	handleDeleteMember = (member) => {
		const {
			dialog,
			dispatch
		} = this.props;

		this.setState({
			selectedMember: {
				id: member.id,
				name: member.name,
				email: member.email,
				phone: member.phone,
				address: member.address
			}
		})

		const dialogData = {
			type: 'confirm',
			title: 'Perhatian!',
			message: 'Anda akan menghapus seluruh data member ini dan aksi ini tidak dapat dipulihkan. Apakah Anda yakin ingin melanjutkan?',
			confirm: () => this.handleDeleteMemberSubmit(),
			confirmText: 'Ya, Lanjutkan',
			cancel: true,
			cancelText: 'Batalkan'
		}

		dispatch(toggleDialog(dialogData, dialog.isOpen));
	}

	handleDeleteMemberSubmit = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			selectedMember
		} = this.state;

		let requiredData = {
			id: selectedMember.id
		}

		dispatch(deleteMember(requiredData, accessToken))
	}

	//
	getMemberList = () => {
		const {
			requiredData
		} = this.state;

		const {
			dispatch,
			accessToken,
			member,
			memberList
		} = this.props;

		dispatch(getAllMemberList(accessToken))
	}

	render() {
		const {
			member,
			memberList,
			isModalOpen
		} = this.props;


		if(member.isFetching) {
			return (
				<p>Sedang memuat...</p>
			)
		}

		if(member.isLoaded) {
			return (
				<SettingsMember
					{...this.props}
					{...this.state}
					toggleModal={this.toggleModal}
					handleInputChange={this.handleInputChange}
					handleUpdateMember={this.handleUpdateMember}
					handleUpdateMemberSubmit={this.handleUpdateMemberSubmit}
					handleDeleteMember={this.handleDeleteMember}
					handleDeleteMemberSubmit={this.handleDeleteMemberSubmit}
				/>
			)
		} else {
			return <p>Maaf, sistem tidak dapat memuat daftar member.</p>
		}
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog,
		member: state.member,
		memberList: state.member.list.data
	}
}


export default connect(mapStateToProps)(SettingsMemberContainer);
