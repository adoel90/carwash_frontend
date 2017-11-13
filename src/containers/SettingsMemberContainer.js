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
		this.handleUpdateMember = this.handleUpdateMember.bind(this);
		this.handleDeleteMember = this.handleDeleteMember.bind(this);
	}

	componentDidMount = () => {
		this.getMemberList();
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

	handleUpdateMember = (data) => {
		const {
			accessToken,
			dispatch
		} = this.props;

		let requiredData = {
			id: data.id,
			name: data.name,
			phone: data.phone,
			email: data.email,
			address: data.address
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
					handleUpdateMember={this.handleUpdateMember}
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
