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
			authentication: {
				cardId: '',
			},
			memberData: {},
			topupData: {
				balance: '',
				payment: 1 /** Defaults to cash */
			},
			error: {
				data: {},
				isError: false
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

		if(prevProps.member.item !== member.item) {
			if(member.item.isAuthenticated) {
				this.setState({
					...this.state,
					memberData: member.item.data
				}, () => {
					this.forceUpdate();
					this.handleTopup();
				});
			}

			if(member.item.isBalanceChanged) {
				let message = (
					<p>Proses isi ulang saldo member telah berhasil. Saldo member kini berjumlah <span className="clr-primary fw-semibold"><Currency value={member.item.data.balance} /></span>.</p>
				)

				let dialogData = {
					type: 'success',
					title: 'Berhasil',
					message: message,
					onClose: () => window.location.reload(),
					closeText: 'Tutup'
				}

				toggleDialog(dialogData);
			}

			if(member.item.isError) {
				/** When an error occurs, set error data from reducer to local state */
				this.setState({
					...this.state,
					error: {
						data: member.item.error.response.data,
						isError: true
					}
				}, () => {
					this.forceUpdate();
				});
			}
		}
	}

	handleMemberAuthenticateSubmit = (e) => {
		const {
			authentication
		} = this.state;

		const {
			dispatch,
			accessToken
		} = this.props;

		e.preventDefault();

		let requiredData = {
			card: authentication.cardId
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
		
		dispatch(memberTopup(requiredData, member.item.accessToken));
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
