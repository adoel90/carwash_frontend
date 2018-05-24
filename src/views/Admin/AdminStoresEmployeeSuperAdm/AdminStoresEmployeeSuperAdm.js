import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';

import { getVendorEmployeeList } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/store.action';
import { AdminStoresEmployeeSuperAdmView } from '../AdminStoresEmployeeSuperAdm';

function mapStateToProps(state) {
    return {
        store: state.store,
        vendorState: state.vendorState,
        access: state.access,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreListDispatch: () => dispatch(getStoreList()),
        // getAccessList: (data) => dispatch(getAccessList(data)),
        // action: bindActionCreators({ updateVendorEmployee, openDialog, closeDialog, getVendorEmployeeList, changeEmployeeStatus }, dispatch)
    }
}

class AdminStoresEmployeeSuperAdm extends Component {

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind();
     
        this.state = {

            storeActiveList : {},
            storeStaffList: {}

        }
    }

    componentDidMount = () => {
        const {getStoreListDispatch} = this.props;
        getStoreListDispatch();
        // this.getAccessList();
    }

    componentDidUpdate = (prevProps) => {
        const{ store, vendorState } = this.props;

        //#GET STORE LIST
        if(prevProps.store.list !== store.list){   
            if(store.list.isLoaded){
                this.setState({  
                    ...this.state,
                    storeActiveList: store.list.isLoaded ? store.list.data.data.result.store : null
                }, () => {
                    // console.log(this.state);
                });
            }
        }

        //#GET STORE STAFF
        if(prevProps.vendorState.employee !== vendorState.employee){
            if(vendorState.employee.isLoaded){
                this.setState({  
                    ...this.state,
                    storeStaffList: vendorState.employee.isLoaded ? vendorState.employee.data.data.result : null
                }, () => {
                    console.log(this.state.storeStaffList);
                });
            }
        }

    }

    handleClickChange = (e) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;

        // console.log(value);
        let requireData = {
            id : value
        }

        const { getVendorEmployeeListDispatch } = this.props;
        getVendorEmployeeListDispatch(requireData)
       

    }

    render() {
        const { store } = this.props;
        const { activeTab } = this.state;

        return (
            <div>
                <AdminStoresEmployeeSuperAdmView 
                    handleClickChange = { this.handleClickChange}
                    {...this.state} 
                    {...this.props} />
            </div>
        ) 

    }
}

// export default AdminStoresEmployeeSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresEmployeeSuperAdm);