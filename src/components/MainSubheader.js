import React from 'react';
import { Nav, NavItem, NavLink } from '../components/Nav';

class MainSubheader extends React.Component {
	constructor() {
		super();
		this.renderNavigationItem = this.renderNavigationItem.bind(this);
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
			navigations,
			member
		} = this.props;

		console.log(navigations);

		return (
			<div className="header sub-header">
				<Nav className="main-navigation">
					{ navigations.map(this.renderNavigationItem) }
				</Nav>
			</div>
		)
	}
}

export default MainSubheader;
