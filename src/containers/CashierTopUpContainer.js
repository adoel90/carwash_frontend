import React, { Component } from 'react';
import { connect } from 'react-redux'
import { authenticateMember, memberTopup } from '../actions/member.action'
import { showDialog, hideDialog } from '../actions/dialog.action';
import Currency from '../components/Currency';

import { CashierTopUp } from '../components/Cashier';

class CashierTopUpContainer extends Component {
	constructor() {
		super();
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTopup = this.handleTopup.bind(this);
		this.handleTopupSubmit = this.handleTopupSubmit.bind(this);
		this.handleMemberAuthenticateSubmit = this.handleMemberAuthenticateSubmit.bind(this);
		this.state = {
			isModalOpen: {
				topup: false
			},
			memberAuthData: {
				card: ''
			},
			topupData: {
				balance: ''
			}
		}
	}

	componentDidUpdate = (prevProps) => {
		const {
			dispatch,
			member,
			dialog,
			toggleDialog
		} = this.props;

		const {
			topupData
		} = this.state;

		if(prevProps.member !== this.props.member) {
			if(member.isAuthenticated) {
				this.handleTopup();
			}

			if(member.isTopup) {
				// let totalBalance = parseInt(member.data.balance) + parseInt(topupData.balance);
				let message = (
					<p>Proses isi ulang saldo member telah berhasil. Saldo member kini berjumlah <span className="clr-primary fw-semibold"><Currency value={member.updatedMember.data.data.balance} /></span>.</p>
				)

				let dialogData = {
					success: {
						type: 'success',
						title: 'Berhasil',
						message: message,
						onClose: () => {
							window.location.reload()
						},
						closeText: 'Tutup'
					}
				}

				toggleDialog(dialogData.success);
				// dispatch(toggleDialog(dialogData.success, dialog.isOpen))
			}
		}
	}

	handleMemberAuthenticateSubmit = (e) => {
		const {
			memberAuthData
		} = this.state;

		const {
			dispatch,
			accessToken
		} = this.props;

		e.preventDefault();

		let requiredData = {
			card: memberAuthData.card
		}

		dispatch(authenticateMember(requiredData));
	}

	handleTopupSubmit = (e) => {
		e.preventDefault();

		const {
			topupData
		} = this.state;

		const {
			dispatch,
			accessToken,
			member
		} = this.props;

		let requiredData = {
			balance: parseInt(topupData.balance.replace(/,/g, ''))
		}

		dispatch(memberTopup(requiredData, member.accessToken));

		// let requiredData = {
		// 	card: topupData.card
		// }
		//
		// dispatch(authenticateMember(requiredData));
	}

	handleTopup = () => {
		this.toggleModal('topup');
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

		console.log(this.state);
	}

	render() {
		return (
			<CashierTopUp
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleMemberAuthenticateSubmit={this.handleMemberAuthenticateSubmit}
				handleTopupSubmit={this.handleTopupSubmit}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dialog: state.dialog,
		member: state.member
	}
}

export default connect(mapStateToProps)(CashierTopUpContainer);
