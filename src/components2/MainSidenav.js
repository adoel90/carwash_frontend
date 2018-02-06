import React from 'react';
import { NavLink } from '../components/Nav';

class MainSidenav extends React.Component {
	constructor() {
		super();
		this.renderSidenavItem = this.renderSidenavItem.bind(this);
	}

	renderSidenavItem = (item, i) => {
		const {
			basePath
		} = this.props;

		const path = item.path 
			? `${basePath}/${item.path}` 
			: `${basePath}/${item.name.replace(/\s+/g, '-').toLowerCase()}`;

		return (
			<li className="sidenav__item" key={i}>
				<NavLink to={path}>
					{ item.name }
				</NavLink>
			</li>
		)
	}

	render() {
		const {
			items
		} = this.props;

		return (
			<nav className="sidenav">
				<ul className="sidenav__list">
					{ items.map(this.renderSidenavItem) }
				</ul>
			</nav>
		)
	}
}

export default MainSidenav;
