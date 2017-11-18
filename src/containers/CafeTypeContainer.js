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
		this.handleTableInputChange = this.handleTableInputChange.bind(this);
	}

	handleTableInputChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[index][name] = parseInt(value);
		this.forceUpdate();
	}

	componentDidMount = () => {
		this.getAllCafeMenu();
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
				handleTableInputChange={this.handleTableInputChange}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe,
		cafeMenuList: state.cafe.list
	}
}

export default connect(mapStateToProps)(CafeTypeContainer);
