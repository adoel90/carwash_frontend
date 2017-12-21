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

	componentWillMount = () => {
		const {
			isAuthenticated,
			handleRedirect
		} = this.props

		if(isAuthenticated) {
			this.handleNavigationItems();
		}
	}

	handleNavigationItems = () => {
		const {
			navigations
		} = this.state;
		
		const {
			user
		} = this.props;

		/**
		 * 	Checks if the authenticated user has some or all of settings modules. 
		 */
		user.module.every((item) => {
			if(item.id == 1 || item.id == 4 || item.id == 9 || item.id == 3 || item.id == 2 || item.id == 5 ) {
				navigations.push({name: 'Pengaturan', path: '/admin/settings'})
			}
		})

		/**
		 * 	Checks if the authenticated user has some or all other modules aside from settings.
		 */
		user.module.forEach((item) => {
			// If cafe module is activated.
			if(item.id == 10) {
				navigations.push({ name: 'Cafe', path: '/admin/cafe' } )
			}

			// If report module is activated.
			if(item.id == 11) {
				navigations.push({ name: 'Laporan', path: '/admin/report' } )
			}

			// If cashier module is activated.
			if(item.id == 12) {
				navigations.push({ name: 'Kasir', path: '/admin/cashier' } )
			}
		})
	}

	render() {
		const {
			user,
			member,
			isAuthenticated
		} = this.props;
 
		return (
			<Admin
				{...this.state}
				{...this.props}
			/>
		);
	}

}

export default AdminContainer;
