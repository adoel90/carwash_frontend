import React from 'react';
import { Nav, NavItem, NavLink } from '../components/Nav';

class MainNavigation extends React.Component {
	constructor() {
		super();
		this.renderNavigationItem = this.renderNavigationItem.bind(this);
		this.handleNavigationList = this.handleNavigationList.bind(this);
		this.state = {
			navigationList: []
		}
	}

	componentDidMount = () => {
		this.handleNavigationList();
	}

	handleNavigationList = () => {
		const { role } = this.props;

		switch(role.id) {
			case 1: {
				this.setState({
					navigationList: [
						{ name: 'Dashboard', path: '/admin/dashboard' },
						{ name: 'Pengaturan', path: '/admin/settings' },
					]
				})
				break;
			}
			case 2: {
				this.setState({
					navigationList: [
						{ name: 'Cafe', path: '/admin/cafe' },
						{ name: 'Kasir', path: '/admin/cashier' },
					]
				})
				break;
			}
			case 3: {
				this.setState({
					navigationList: [
						{ name: 'Self-Service', path: '/customer/service' },
					]
				})
			}
			default: {
				return null;
			}
		}
	}

	renderNavigationItem = (navigation, i) => {
		return (
			<NavItem key={i}>
				<NavLink to={navigation.path}>{navigation.name}</NavLink>
			</NavItem>
		)
	}

	render() {
		const {
			navigationList
		} = this.state;

		return (
			<Nav className="main-navigation">
				{ navigationList.map(this.renderNavigationItem) }
			</Nav>
		)
	}
}

export default MainNavigation;
