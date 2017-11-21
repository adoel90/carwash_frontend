import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Admin } from '../components/Admin';

class AdminContainer extends Component {
	constructor() {
		super();
		this.handleNavigationItems = this.handleNavigationItems.bind(this);
		this.state = {
			navigations: []
		}
	}

	handleNavigationItems = () => {
		const {
			user
		} = this.props;

		const level = user.level.id;

		switch(level) {
			case 1: {
				this.setState({
					navigations: [
						{ name: 'Pengaturan', path: '/admin/settings' },
						{ name: 'Laporan', path: '/admin/report' }
					]
				})
				break;
			}
			case 2: {
				this.setState({
					navigations: [
						{ name: 'Kafe', path: '/admin/cafe' },
						{ name: 'Kasir', path: '/admin/cashier' },
					]
				})
				break;
			}

			default: {
				return null;
			}
		}
	}

	render() {
		const {
			user,
			isAuthenticated
		} = this.props;

		return (
			<Admin
				{...this.state}
				{...this.props}
				handleNavigationItems={this.handleNavigationItems}
			/>
		);
	}

}

export default AdminContainer;
