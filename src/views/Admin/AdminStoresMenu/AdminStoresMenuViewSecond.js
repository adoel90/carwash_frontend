import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { TableSet, TableSetOld } from '../../../components/Table';

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

        const { storeActiveList, storeMenuList, store } = this.props;
        console.log(this.props.type.id);
        console.log(this.props);
        

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