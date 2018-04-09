import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AdminTransactionView } from '../AdminTransaction'
// import { getStoreList } from '../../../actions/store.action';
import { getStoreList } from '../../../actions/vendor.action'; //with id user login existing

//******************API POST - /store/transaction/create?accessToken={accessToken} Create new store transaction

function mapStateToProps(state) {
    return {
        store: state.store,
        dialog : state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        // getMenuStoreListDispatch: (data) => { dispatch(getMenuStoreList(data))},
        // action: bindActionCreators({ updateMenuVendor, openDialog, closeDialog, getMenuStoreList }, dispatch)
    }
}


class AdminTransaction extends Component {


    componentDidMount(){
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }

    componentDidUpdate(prevprops){
        
        const { store } = this.props;
        if(prevprops.store.list !== store.list){
            console.log(store);
            
        }
    }

    render(){

        return(
            <div>
                <AdminTransactionView 
                    {...this.props}
                    {...this.state}/>
            </div>
        )
    }
}

// export default AdminTransaction;
export default connect( mapStateToProps, mapDispatchToProps )(AdminTransaction);