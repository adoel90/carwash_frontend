import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getMemberList,
	updateMember
} from '../actions/member.action';
import { SettingsMember } from '../components/Settings';

class SettingsMemberContainer extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			selectedMember: {
				name: '',
				email: '',
				phone: '',
				address: ''
			},
			isModalOpen: {
				editMember: false
			}
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.getMemberList = this.getMemberList.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateMember = this.handleUpdateMember.bind(this);
		this.handleUpdateMemberSubmit = this.handleUpdateMemberSubmit.bind(this);
		this.handleDeleteMember = this.handleDeleteMember.bind(this);
	}

	componentDidMount = () => {
		this.getMemberList();
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

	handleDeleteMember = () => {

	}

	//
	getMemberList = () => {
		const {
			dispatch,
			accessToken,
			member,
		} = this.props;

		const requiredData = {
			limit: 10,
			offset: 0
		}

		dispatch(getMemberList(requiredData, accessToken));
	}

	render() {
		const {
			member,
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
				/>
			)
		} else {
			return <p>Maaf, sistem tidak dapat memuat daftar member.</p>
		}
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member,
		memberList: state.member.list.member
	}
}

export default connect(mapStateToProps)(SettingsMemberContainer);
