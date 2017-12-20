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
			navigations
		} = this.state;
		
		const {
			user
		} = this.props;

		user.module.every((item) => {
			if(item.id == 1 || item.id == 4 || item.id == 9 || item.id == 3 || item.id == 2 || item.id == 5 ) {
				navigations.push({name: 'Pengaturan', path: '/admin/settings'})
			}
		})

		user.module.forEach((item) => {
			// If cafe module is activated.
			if(item.id == 10) {
				navigations.push({ name: 'Cafe', path: '/admin/cafe' } )
			}

			// If report module is activated.
			if(item.id == 11) {
				navigations.push({ name: 'Laporan', path: '/admin/report'})
			}

			// If cashier module is activated.
			if(item.id == 12) {
				navigations.push({ name: 'Kasir', path: '/admin/cashier' } )
			}
		})

		// const level = user.level.id;

		// switch(level) {
		// 	case 1: {
		// 		this.setState({
		// 			navigations: [
		// 				{ name: 'Pengaturan', path: '/admin/settings' },
		// 				{ name: 'Laporan', path: '/admin/report' }
		// 			]
		// 		})
		// 		break;
		// 	}
		// 	case 2: {
		// 		this.setState({
		// 			navigations: [
		// 				{ name: 'Kafe', path: '/admin/cafe' },
		// 				{ name: 'Kasir', path: '/admin/cashier' },
		// 			]
		// 		})
		// 		break;
		// 	}
			
		// 	default: {
		// 		return null;
		// 	}
		// }
	}

	render() {
		const {
			user,
			member,
			isAuthenticated
		} = this.props;
		
		console.log(user);
 
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
