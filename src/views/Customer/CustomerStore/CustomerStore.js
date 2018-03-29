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
        // this.addPathPropToTypes = this.addPathPropToTypes.bind(this);
        
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
                    if(item.status && (member.id == item.id || !member.id)) {
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

    handleSearchFilter = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSearchFilterSubmit = () => {
        const {
            searchText
        } = this.props;
    }

    handlePaymentDetailSubmit = (e) => {
        e.preventDefault();

        this.toggleModal('paymentDetail');
    }

    handlePaymentProcessSubmit = (e) => {
        const {
            dispatch,
            member
        } = this.props;

        const {
            selectedMenus
        } = this.state;

        e.preventDefault();

        let dataArray = [];

        selectedMenus.map((menu, i) => {
            let requiredData = {
                id: menu.id,
                quantity: menu.quantity
            }

            dataArray.push(requiredData);
        })

        // dispatch(createStoreTransaction(dataArray));
    }

    handlePaymentMemberAuthentication = (e) => {
        const {
            paymentProcess
        } = this.state;

        const {
            dispatch
        } = this.props;

        e.preventDefault();

        let requiredData = {
            card: paymentProcess.card
        }

        // dispatch(authenticateMember(requiredData));
    }

    handleSelectMenu = (menu) => {
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
                selectedMenus: filteredMenu
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