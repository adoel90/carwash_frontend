import React from 'react';
import { CafeType } from '../components/Cafe';

import { connect } from 'react-redux';
import {
	getAllCafeMenu,
	getCafeMenuList
} from '../actions/cafe.action';

class CafeTypeContainer extends React.Component {
	constructor() {
		super();
		this.getAllCafeMenu = this.getAllCafeMenu.bind(this);
		this.selectMenu = this.selectMenu.bind(this);
		this.state = {
			searchText: '',
			selectedCafeMenus: []
		}
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
	}

	selectMenu = (menu) => {
		const {
			selectedCafeMenus
		} = this.state;

		if(!menu.selected) {
			menu.selected = true;
			this.setState({
				selectedCafeMenu: selectedCafeMenus.concat([menu])
			})
		}
		else {
			menu.selected = false;
			let filteredMenu = selectedCafeMenus.filter((item) => {
				return item != menu
			})

			this.forceUpdate();
		}
	}

	getAllCafeMenu = () => {
		const {
			type,
			dispatch,
			accessToken
		} = this.props;

		let requiredData = {
			cafe: type.id
		}

		dispatch(getAllCafeMenu(requiredData, accessToken));
	}

	render() {
		return (
			<CafeType
				{...this.state}
				{...this.props}
				selectMenu={this.selectMenu}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeMenuList: state.cafe.list,
		member: state.member
	}
}

export default connect(mapStateToProps)(CafeTypeContainer);
