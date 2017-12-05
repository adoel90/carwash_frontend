import React from 'react';
import { connect } from 'react-redux';
import {
	getCafeTypes,
	updateCafeMenu
} from '../actions/cafe.action';
import { SettingsCafe } from '../components/Settings';
import { sortBy } from '../utils';

class SettingsCafeContainer extends React.Component {
	constructor() {
		super();
		this.toggleTab = this.toggleTab.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleInputIndexChange = this.handleInputIndexChange.bind(this);
		this.handleCafeTypeSettings = this.handleCafeTypeSettings.bind(this);
		this.handleNewCafeTypeSubmit = this.handleNewCafeTypeSubmit.bind(this);
		this.handleUpdateCafeTypeSubmit = this.handleUpdateCafeTypeSubmit.bind(this);
		this.handleChangeCafeTypeStatus = this.handleChangeCafeTypeStatus.bind(this);

		this.state = {
			cafeTypes: {
				all: [],
				active: []
			},
			isModalOpen: {
				cafeTypeSettings: false,
				cafeMenuCreate: false,
				cafeMenuUpdate: false
			},
			newCafeType: {
				name: ''
			},
			activeTab: 0
		}
	}

	componentDidMount = () => {
		this.getCafeTypes();
	}

	componentDidUpdate = (prevProps) => {
		const { cafeTypes } = this.state;
		const { cafe } = this.props;

		if(prevProps.cafe.types !== cafe.types) {
			if(cafe.types.isLoaded) {
				let sortedTypes = cafe.types.data.sort(sortBy('name'));
				let activeTypes = [];

				sortedTypes.map((type) => {
					if(type.status) {
						activeTypes.push(type);
					}
				});

				this.setState({
					cafeTypes: {
						all: sortedTypes,
						active: activeTypes
					}
				})
			}
		}
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
	}

	handleInputIndexChange = (object, index, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		object[index].name = value;
		this.forceUpdate();
	}

	toggleTab = (tabIndex) => {
		this.setState({
			activeTab: tabIndex
		})
	}

	toggleModal = (name) => {
		const { isModalOpen } = this.state;

		this.setState({
			isModalOpen: {
				...isModalOpen,
				[name]: !isModalOpen[name]
			}
		})
	}

	handleCafeTypeSettings = () => {
		this.toggleModal('cafeTypeSettings');
	}

	handleNewCafeType = () => {
		this.toggleModal('cafeTypeCreate');
	}

	handleNewCafeTypeSubmit = (e) => {
		e.preventDefault();
	}

	handleUpdateCafeTypeSubmit = () => {

	}

	handleChangeCafeTypeStatus = () => {

	}

	getCafeTypes = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getCafeTypes(accessToken));
	}

	render() {
		return (
			<SettingsCafe
				{...this.state}
				{...this.props}
				toggleTab={this.toggleTab}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleInputIndexChange={this.handleInputIndexChange}
				handleCafeTypeSettings={this.handleCafeTypeSettings}
				handleUpdateCafeType={this.handleUpdateCafeType}
				handleNewCafeTypeSubmit={this.handleNewCafeTypeSubmit}
				handleUpdateCafeTypeSubmit={this.handleUpdateCafeTypeSubmit}
				handleChangeCafeTypeStatus={this.handleChangeCafeTypeStatus}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(SettingsCafeContainer);
