import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TableSet, TableSetOld } from '../../../components/Table';
// import { getMenuStoreList } from '../../../actions/vendor.action';
// import { getMenuListStore } from '../../../actions/store.action';

// function mapStateToProps(state) {
//     return {
//         vendorState : state.vendorState,
//         dialog : state.dialog,
//         store: state.store
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         // getMenuStoreListDispatch: (data) => { dispatch(getMenuStoreList(data))},
//         action: bindActionCreators({ getMenuListStore }, dispatch)
//     }
// }

class AdminStoresMenuViewSecond extends Component {


    constructor(){
        super();
        this.state = {

            table: {
				columns: [
					{ accessor: 'name', title: 'Name' },
					{ accessor: 'price', title: 'Price', isCurrency: true },
                ]
            }
        }
    }
    


    render (){

        const { storeActiveList, storeMenuList, store, getMenuStoreListDispatch } = this.props;
        console.log(this.props.type.id);
        console.log(this.props.type.name);
        console.log(getMenuStoreListDispatch);
        // action.getMenuListStore(this.props.type.id);
        // getMenuStoreListDispatch(this.props.type.name); a

        const { table }  = this.state;
        

        return (
            <div className="admin-user__content">

                Hui hui
        
            </div>
        )
    }
}

export default AdminStoresMenuViewSecond;
// export default connect( mapStateToProps )(AdminStoresMenuViewSecond);
// export default connect( mapDispatchToProps )(AdminStoresMenuViewSecond);