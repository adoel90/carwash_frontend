import React from 'react';
import NavLink from '../components/NavLink';

class MainSidenav extends React.Component {
	constructor() {
		super();
		this.renderSidenavItem = this.renderSidenavItem.bind(this);
	}

	renderSidenavItem = (item, i) => {
		console.log(this.props);

		return (
			<li className="sidenav__item" key={i}>
				<NavLink to={`${this.props.basePath}/${item.name}`}>
					{ item.title }
				</NavLink>
			</li>
		)
	}

	render() {
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
