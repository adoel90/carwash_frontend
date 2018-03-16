import React from 'react';
// import { NavLink } from '../components/Nav';
import { NavLink } from '../components/Nav';


import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { getMenuListStore } from '../actions/store.action';
// function mapStateToProps(state) {

//     return {
// 		storeState : state.storeState,

//     };
// }

// function mapDispatchToProps(dispatch) {

//     return {

// 		getMenuListStoreState : (data) => dispatch(getMenuListStore(data))

//     }
// }

class MainSidenav extends React.Component {

	constructor() {
		super();
		this.renderSidenavItem = this.renderSidenavItem.bind(this);
		this.handleid = this.handleid.bind(this);
		// this.getMenuListStore = this.getMenuListStore.bind(this);

		this.state = {

			storeId: {
				id: null
			}
		}
	}

	// componentDidMount = () => {

	// 	const { storeState } = this.props;
	// 	this.getMenuListStore();

	// }


	// getMenuListStore = () => {

	// }


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
		// console.log(id)
		const { getMenuListStoreState } = this.props;

		const data = {
			id: id
		};

		// console.log(data);

		this.setState({
			storeId: data
		}, () => {
			console.log(this.state);

		})
		// getMenuListStoreState(data);
	}

	render() {
		const {
			items
		} = this.props;

		return (

			// <nav className="sidenav">
			// 	<ul className="sidenav__list">
			// 		{ items.map(this.renderSidenavItem) }
			// 	</ul>
			// </nav>

			<nav className="sidenav">
				<ul className="sidenav__list">
					{items.map(this.renderSidenavItem)}
				</ul>
			</nav>
		)
	}
}

// export default connect(mapStateToProps, mapDispatchToProps)(MainSidenav);
export default MainSidenav;
