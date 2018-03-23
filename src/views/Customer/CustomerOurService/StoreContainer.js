import React from 'react';
import { connect } from 'react-redux';
import { Service } from '../../../components/Service';
import PropTypes from 'prop-types';
import { showDialog, hideDialog } from '../../../actions/dialog.action';
import { getStoreList, getMenuListStore } from '../../../actions/store.action';

/*
	Jadi action "getServiceTypes itu sama dengan "getStoreList"

	Jadi "ServiceContainer" itu sama dengan "StoreContainer"

*/


function mapStateToProps(state) {
	return {
		storeState: state.storeState,
		member: state.member,
		dialog: state.dialog,
		service: state.service
	};
}

function mapDispatchToProps(dispatch) {

	return {

		getStoreState: () => dispatch(getStoreList()),
		getMenuListStoreState: (data) => dispatch(getMenuListStore(data)),
		showDialogDispatch: (data) => dispatch(showDialog(data)),
		hideDialogDispatch: ()=> dispatch(hideDialog())

	}
}

class StoreContainer extends React.Component {

	constructor() {
		super();
		this.toggleDialog = this.toggleDialog.bind(this);
		this.showDialog = this.showDialog.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
		this.addPathPropToTypes = this.addPathPropToTypes.bind(this);

		this.getStoreList = this.getStoreList.bind(this);
		// this.getMenuListStore = this.getMenuListStore.bind(this);
		// this.populateData = this.populateData.bind(this);

		this.state = {

			// memberDetail: {},
			serviceTypes: {
				all: [],
				active: []
			},

			storeState:{},
			storeList:{
				all: [],
				active: []
			}
		}
	}

	componentDidMount = () => {

		const {
			// memberData,
			member
		} = this.props;

		let requiredData = {
			// id: memberData.id,
			id: member.id,
			transaction: false

		};

		this.getStoreList();
		// this.getMenuListStore();

	}

	componentDidUpdate = (prevProps) => {

		const {
			storeState,
			member,
			// service,
			// storeDetail
		} = this.props;


		if(prevProps.member !== this.props.member) {
			if(member.item.isAuthenticated) {
				window.location.reload();
			}

			if(member.item.isError) {
				this.setState({
					...this.state,
					error: {
						data: member.item.error.response.data,
						isError: true,
					}
				})
			}
		}

		if (prevProps.storeState.store !== storeState.store) {
			if (storeState.store.isLoaded) {

				// window.location.reload();

				let activeStoreList = [];

				storeState.store.data.data.result.store.forEach((item) => {
					if(item.status) {
						activeStoreList.push(item);
					}		
				});
				
				//#versi-01
				this.setState({
	
					storeList : {
						all: storeState.store.data.data.result.store,
						active: activeStoreList
					}
				}, () => {
					// console.log(this.state.storeList)
				});		
			}
		}
	}
	getStoreList = () => {

		const { getStoreState } = this.props;
		getStoreState();

	}

	toggleDialog = (data) => {
		const {
			dialog,
			dispatch
		} = this.props;

		// console.log(data);

		if (!dialog.isOpened) {
			this.showDialog(data);
		}
		else {
			this.hideDialog();
		}
	}

	showDialog = (data) => {
		const {dialog, showDialogDispatch } = this.props;
		// dispatch(showDialog(data));
		showDialogDispatch(data);
	}

	hideDialog = () => {
		const { dialog,hideDialogDispatch  } = this.props;

		// dispatch(hideDialog());
		hideDialogDispatch();
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

		if (service.isLoaded) {
			this.addPathPropToTypes();
		}

		return (
			<Service
				{...this.state}
				{...this.props}
				toggleDialog={this.toggleDialog}
				showDialog={this.showDialog}
				hideDialog={this.hideDialog}
				populateData={this.populateData}
			/>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreContainer);

