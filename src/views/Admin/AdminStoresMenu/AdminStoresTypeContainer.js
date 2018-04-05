import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageBlock, PageBlockGroup } from '../../../components/Page';
import  AdminStoresMenuViewSecond  from './AdminStoresMenuViewSecond';


function mapStateToProps(state) {
    return {
        store : state.store,
        dialog: state.dialog,
        vendorState: state.vendorState
    };
}

class AdminStoresTypeContainer extends Component {

    constructor() {
		super();
		this.renderStoreMenuList = this.renderStoreMenuList.bind(this);
	}

    renderStoreMenuList = () => {
       
        const { store, storeActiveList } = this.props;
        

        if(store.list.fetching){
            return <p>Sedang memuat daftar store. Mohon tungggu sebentar...</p>
        }
        
        if(store.list.isLoaded){
            if(store.list.data.data.result.store.length){
                return (
                    <div>
                        <b>Hoi hoi</b>
                        <AdminStoresMenuViewSecond {...this.props} />
                    </div>
                    
                )

            } else {
                return (
                    <div className="flex justify-content--center flex-column ta-center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Maaf, sistem tidak dapat menemukan daftar produk. <br /> Hubungi Administrator untuk memperbaiki.</p>
					</div>
                )
            }

         
        } 
    }

    render() {

        const {store } = this.props


        return (
            <div>
                <h1>Hai Type Store</h1>
                <PageBlockGroup>
                    <PageBlock>
                    { this.renderStoreMenuList() }
                    </PageBlock>



                </PageBlockGroup>
            </div>
           
        )
    }
}

// export default AdminStoresTypeContainer;
// export default connect(mapStateToProps, mapDispatchToProps)(AdminStoresTypeContainer); 
export default connect(mapStateToProps)(AdminStoresTypeContainer); 