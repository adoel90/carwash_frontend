import React from 'react';
import { connect } from 'react-redux';
import { Service } from '../components/Service';
import PropTypes from 'prop-types';
import {
	showDialog,
	hideDialog
} from '../actions/dialog.action';



import { getServiceTypes } from '../actions/service.action.js';

class ServiceContainer extends React.Component {
	constructor() {
		super();
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);
		this.state = {
			serviceTypes: {
				all: [],
				active: []
			}
		}
	}

	componentDidMount = () => {
		const {
			accessToken,
			dispatch
		} = this.props;

		dispatch(getServiceTypes(accessToken));
	}

	componentDidUpdate = (prevProps) => {
		const {
			service
		} = this.props;
		
		if(prevProps.service.types !== service.types) {
			if(service.types.isLoaded) {
				let activeTypes = [];

				service.types.data.forEach((item) => {
					if(item.status) {
						activeTypes.push(item);
					}
				})

				this.setState({
					serviceTypes: {
						all: service.types.data,
						active: activeTypes
					}
				})
			}
		}
	}

	toggleDialog = (data) => {
		const {
			dialog,
			dispatch
		} = this.props;

		console.log(data);

		if(!dialog.isOpened) {
			this.showDialog(data);
		}
		else {
			this.hideDialog();
		}
	}

	showDialog = (data) => {
		const { dialog, dispatch } = this.props;

		dispatch(showDialog(data))
	}

	hideDialog = () => {
		const { dialog, dispatch } = this.props;

		dispatch(hideDialog());
	}

	addPathPropToTypes = () => {
		const {
			service
		} = this.props;

		service.types.map((type, i) => {
			return type.path = type.name.replace(/\s+/g, '-').toLowerCase();
		})
	}

	render() {
		const {
			member,
			service,
			accessToken
		} = this.props;

		if(service.isLoaded) {
			this.addPathPropToTypes();
		}

		return (
			<Service 
				{...this.state}
				{...this.props}
				toggleDialog={this.toggleDialog}
				showDialog={this.showDialog}
				hideDialog={this.hideDialog}
			/>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		dialog: state.dialog,
		service: state.service
	}
}

export default connect(mapStateToProps)(ServiceContainer);
