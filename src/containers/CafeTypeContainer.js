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
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTableInputChange = this.handleTableInputChange.bind(this);
		this.handleSelectMenu = this.handleSelectMenu.bind(this);
		this.state = {
			cafeList: [],
			selectedMenuList: [],
			searchMenu: {
				searchText: ''
			}
		}
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[name] = value;
		this.forceUpdate();

	}

	handleTableInputChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[index][name] = parseInt(value);
		this.forceUpdate();
	}

	handleSelectMenu = (menu) => {
		const { selectedMenuList } = this.state;

		if(!menu.selected) {
			menu.selected = true;
			this.setState({
				...this.state,
				selectedMenuList: selectedMenuList.concat([menu])
			})
		}
		else {
			menu.selected = false;
			this.setState({
				...this.state,
				selectedMenuList: selectedMenuList.filter(item => item != menu)
			})
		}
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
	}

	componentDidUpdate = (prevProps) => {
		const {
			cafe
		} = this.props;

		if(prevProps.cafe.list !== cafe.list) {
			if(cafe.list.isLoaded) {
				let activeList = []

				cafe.list.data.map((item) => {
					if(item.status) {
						activeList.push(item);
					}
				})

				this.setState({
					cafeList: activeList
				})
			}
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
				handleInputChange={this.handleInputChange}
				handleTableInputChange={this.handleTableInputChange}
				handleSelectMenu={this.handleSelectMenu}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		// cafeList: state.cafe.list
	}
}

export default connect(mapStateToProps)(CafeTypeContainer);
