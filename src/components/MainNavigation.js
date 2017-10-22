import React from 'react';
import NavLink from '../components/NavLink';

class MainNavigation extends React.Component {
	constructor() {
		super();
		this.renderNavigationItem = this.renderNavigationItem.bind(this);
		this.state = {
			navigationList: [
				{ name: 'Layanan Self-Service', path: '/service' },
				{ name: 'Profil Saya', path: '/profile' },

				{ name: 'Kasir', path: '/cashier' },
				{ name: 'Cafe', path: '/cafe' },

				{ name: 'Settings', path: '/settings' }
			]
		}
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
