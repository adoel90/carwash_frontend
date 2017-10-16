import React from 'react';
import NavLink from '../components/NavLink';

class MainNavigation extends React.Component {
	constructor() {
		super();
		this.state = {
			navigationList: [
				{ name: 'Layanan Self-Service', path: '/self-service' },
				{ name: 'Profile', path: '/profile' },
				{ name: 'Cashier', path: '/cashier' },
				{ name: 'Settings', path: '/settings' }
			]
		}
		this.renderNavigationItem = this.renderNavigationItem.bind(this);
	}

	renderNavigationItem = (navigation, i) => {
		return (
			<li className="navigation__item" key={i}>
				<NavLink to={navigation.path}>{navigation.name}</NavLink>
			</li>
		)
	}

	render() {
		const {
			navigationList
		} = this.state;

		return (
			<nav className="navigation main-navigation">
				<ul className="navigation__list">
					{ navigationList.map(this.renderNavigationItem) }
				</ul>
			</nav>
		)
	}
}

export default MainNavigation;
