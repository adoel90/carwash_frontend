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
		this.handleTableInputChange = this.handleTableInputChange.bind(this);
		this.state = {
			searchText: '',
			selectedMenus: [],
			grandTotal: ''
		}
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
	}

	handleTableInputChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[index][name] = value;
		this.forceUpdate();
	}

	selectMenu = (menu) => {
		const {
			selectedMenus
		} = this.state;

		if(!menu.selected) {
			menu.selected = true;
			this.setState({
				selectedMenus: selectedMenus.concat([menu])
			})
		}
		else {
			menu.selected = false;
			let filteredMenu = selectedMenus.filter((item) => {
				return item != menu
			})

			this.setState({
				selectedCafeMenus: filteredMenu
			})
		}

		console.log(selectedMenus);
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
				handleTableInputChange={this.handleTableInputChange}
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
