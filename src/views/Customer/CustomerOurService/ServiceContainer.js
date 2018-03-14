import React from 'react';
import { connect } from 'react-redux';
// import { Service } from '../components/Service';
import { Service, ServiceType } from '../../../components/Service';
import PropTypes from 'prop-types';
// import { getMemberDetail } from '../actions/member.action';
// import { getMemberDetail } from '../../../actions/member.action';

import { showDialog, hideDialog } from '../../../actions/dialog.action';


import { getStoreList } from '../../../actions/store.action';


// const mapStateToProps = (state, props) => {
// 	return {
// 		member: state.member,
// 		dialog: state.dialog,
// 		service: state.service
// 	}
// }

function mapStateToProps(state) {
    return {
		storeState : state.storeState,
		member: state.member,
		dialog: state.dialog,
		service: state.service
    };
}

function mapDispatchToProps(dispatch) {

    return {

        getStoreState: () => dispatch(getStoreList()),
        
    }
}


class ServiceContainer extends React.Component {
	constructor() {
		super();
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);

		this.getStoreList = this.getStoreList.bind(this);

		this.state = {
			memberDetail: {},
			serviceTypes: {
				all: [],
				active: []
			}
		}
	}

	componentDidMount = () => {
		const {
			// memberData,
			member,
			accessToken,
			dispatch
		} = this.props;

		// console.log(this.props.member);
		
		let requiredData = {
			// id: memberData.id,
			id: member.id,
			transaction: false
		};

		this.getStoreList();
		// console.log(requiredData)

		// dispatch(getMemberDetail(requiredData, accessToken));
		// dispatch(getServiceTypes(accessToken));
	}

	getStoreList = () => {
		const { getStoreState } = this.props;

        getStoreState();
	}

	componentDidUpdate = (prevProps) => {
		const {
			member,
			service
		} = this.props;

		if(prevProps.member.item !== member.item) {
			if(member.item.isLoaded) {
				this.setState({
					memberDetail: member.item
				}, () => {
					console.log(this.state);
				});
			}
		}
		
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



export default connect(mapStateToProps,mapDispatchToProps )(ServiceContainer);

