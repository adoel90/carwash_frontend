import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
	getAllAccess,
	updateAccess
} from '../actions/access.action'

import { getAllModule } from '../actions/module.action'

import { SettingsAccess } from '../components/Settings'

class SettingsAccessContainer extends Component {
	constructor() {
		super();
		this.getAllAccess = this.getAllAccess.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleUpdateAccess = this.handleUpdateAccess.bind(this);
		this.handleUpdateAccessSubmit = this.handleUpdateAccessSubmit.bind(this);
		this.handleChangeAccessStatus = this.handleChangeAccessStatus.bind(this);
		this.state = {
			accessList: {},
			moduleList: {},
			selectedAccess: {},
			search: {
				searchText: '',
				searchBy: 'name'
			},
			isModalOpen: {
				updateAccess: false
			}
		}
	}

	componentDidMount = () => {
		this.getAllAccess();
		this.getAllModule();
	}

	componentDidUpdate = (prevProps) => {
		const {
			access,
			module
		} = this.props;
		
		const {
			accessList,
			moduleList
		} = this.state;

		if(prevProps.access.list !== access.list) {
			this.setState({
				accessList: access.list
			}, () => {
				this.forceUpdate();
			});
		}

		if(prevProps.module.list !== module.list) {
			this.setState({
				moduleList: module.list
			}, () => {
				console.log(moduleList);
				this.forceUpdate();
			})
		}
	}

	getAllAccess = () => {
		const { 
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllAccess(accessToken));
	}

	getAllModule = () => {
		const {
			dispatch,
			accessToken
		} = this.props;

		dispatch(getAllModule(accessToken));
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

	handleInputChange = (object, e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
	}
	
	handleUpdateAccess = (access, e) => {
		const {
			dispatch,
			accessToken
		} = this.props;

		let accessCopy = Object.assign({}, access);

		this.setState({
			selectedAccess: {
				id: accessCopy.id,
				name: accessCopy.name,
				module: accessCopy.module
			}
		}, () => {
			this.toggleModal('updateAccess');
		})
	}

	handleUpdateAccessSubmit = (e) => {
		e.preventDefault();

		const {
			dispatch,
			accessToken
		} = this.props;

		const {
			selectedAccess
		} = this.state;

		let requiredData = {
			id: selectedAccess.id,
			name: selectedAccess.name,
			module: selectedAccess.module
		}

		dispatch(updateAccess(requiredData, accessToken));
	}

	handleChangeAccessStatus = () => {

	}

	render() {
		return (
			<SettingsAccess
				{...this.state}
				{...this.props}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleUpdateAccess={this.handleUpdateAccess}
				handleUpdateAccessSubmit={this.handleUpdateAccessSubmit}
				handleChangeAccessStatus={this.handleChangeAccessStatus}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		access: state.access,
		module: state.module
	}
}

export default connect(mapStateToProps)(SettingsAccessContainer);
