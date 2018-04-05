import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { getStoreList } from '../../../actions/store.action';
import { CustomerStoreView } from '../CustomerStore';

class CustomerStore extends Component {
	constructor() {
		super();
		this.getStoreList = this.getStoreList.bind(this);
		this.toggleDialog = this.toggleDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			storeList: {
				all: [],
				active: []
			}
		}
	}

	componentDidMount = () => {
		this.getStoreList();
	}

	componentDidUpdate = (prevProps) => {
		const {
            dispatch,
            dialog,
			store,
			member
        } = this.props;

        if (prevProps.store.list !== store.list) {
			if (store.list.isLoaded) {
                let activeStore = [];
				
				store.list.data.data.result.store.forEach((item) => {
                    if(item.status && (member.id == item.id || !member.id) && item.owner) {
						activeStore.push(item);
					}
				});
				
				this.setState({
					storeList : {
						all: store.list.data.data.result.store,
						active: activeStore
					}
				});
			}
		}
    }

    toggleDialog = (data) => {
		const {
			dialog,
			dispatch
        } = this.props;
        
		if (!dialog.isOpened) {
			this.openDialog(data);
		}
		else {
			this.closeDialog();
		}
	}

	openDialog = (data) => {
        const { dialog, dispatch } = this.props;
        
		dispatch(openDialog(data));
	}

	closeDialog = () => {
        const { dialog, dispatch  } = this.props;
        
		dispatch(closeDialog());
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

    getStoreList = () => {
        const { dispatch } = this.props;
        
		dispatch(getStoreList());
	}

	render() {
		return (
            <CustomerStoreView 
                {...this.state}
                {...this.props}
                toggleDialog={this.toggleDialog}
                openDialog={this.openDialog}
                closeDialog={this.closeDialog}
                handleInputChange={this.handleInputChange}
            />
        );
	}
}

const mapStateToProps = (state) => {
	return {
		store: state.store,
		member: state.member,
		dialog: state.dialog
	};
}

export default connect(mapStateToProps)(CustomerStore);