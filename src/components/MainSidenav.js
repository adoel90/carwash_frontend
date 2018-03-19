import React from 'react';
import { NavLink } from '../components/Nav';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MainSidenav extends React.Component {

	constructor() {
		super();
		this.renderSidenavItem = this.renderSidenavItem.bind(this);
		this.handleid = this.handleid.bind(this);

		this.state = {

			storeId: {
				id: null
			}
		}
	}


	renderSidenavItem = (item, i) => {
		const {
			basePath
		} = this.props;

		const path = item.path ? `${basePath}/${item.path}` : `${basePath}/${item.name.replace(/\s+/g, '-').toLowerCase()}`;

		return (

			<li className="sidenav__item" key={i} onClick={(e) => this.handleid(item.id, e)}>
				<NavLink to={path}>
					{item.name}

				</NavLink>
			</li>
		)
	}

	handleid = (id, e) => {
		
		e.preventDefault();
	
		// const data = {
		// 	id: id
		// };

		// this.setState({
		// 	storeId: data.id
		// }, () => {
		// 	console.log(this.state);

		// })
	}

	render() {
		const {
			items
		} = this.props;

		return (
			<nav className="sidenav">
				<ul className="sidenav__list">
					{items.map(this.renderSidenavItem)}
				</ul>
			</nav>
		)
	}
}

export default MainSidenav;
