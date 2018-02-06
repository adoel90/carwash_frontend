 import React from 'react';
import { Nav, NavItem, NavLink } from '../components/Nav';

class MainNavigation extends React.Component {

	renderNavigationItem = (navigation, i) => {
		return (
			<NavItem key={i}>
				<NavLink to={navigation.path}>{navigation.name}</NavLink>
			</NavItem>
		)
	}

	render() {
		const {
			items
		} = this.props;

		return (
			<Nav className="main-navigation">
				{ items.map(this.renderNavigationItem) }
			</Nav>
		)
	}
}

export default MainNavigation;
