import React from 'react';
import { Link } from 'react-router-dom';

class MainNavigation extends React.Component {
	constructor() {
		super();
		this.state = {
			navigationList: [
				{ name: 'Layanan Cuci Mobil', path: '/carwash' },
				{ name: 'Profile', path: '/profile' },
				{ name: 'Settings', path: '/settings' }
			]
		}
		this.renderNavigationItem = this.renderNavigationItem.bind(this);
	}

	renderNavigationItem = (navigation) => {
		return (
			<li className="navigation-item">
				<Link to={navigation.path}>{navigation.name}</Link>
			</li>
		)
	}

	render() {
		const {
			navigationList
		} = this.state;

		return (
			<nav className="navigation main-navigation">
				<ul className="navigation-list">
					{ navigationList.map(this.renderNavigationItem) }
				</ul>
			</nav>
		)
	}
}

export default MainNavigation;
