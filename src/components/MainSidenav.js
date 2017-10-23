import React from 'react';
import NavLink from '../components/NavLink';

class MainSidenav extends React.Component {
	constructor() {
		super();
		this.renderSidenavItem = this.renderSidenavItem.bind(this);
	}

	renderSidenavItem = (item, i) => {
		const path = item.name ? item.name.replace(/\s+/g, '-').toLowerCase() : null;

		return (
			<li className="sidenav__item" key={i}>
				<NavLink to={ item.name ? `${this.props.basePath}/${path}` : item.path}>
					{ item.name ? item.name : item.title }
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
					{ this.props.items.map(this.renderSidenavItem) }
				</ul>
			</nav>
		)
	}
}

export default MainSidenav;
