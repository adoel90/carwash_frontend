import React, { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { getStoreList } from '../../../actions/vendor.action';
import { getPromoDiscountList } from '../../../actions/store.action';
import { AdminStoresPromoView } from '../AdminStoresPromo';

function mapStateToProps(state) {
    return {
        store : state.store
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        getPromoDiscountListDispatch: (data) => dispatch(getPromoDiscountList(data))
    }
}

class AdminStoresPromo extends Component {

    constructor(){
        super();

        this.populateTableData = this.populateTableData.bind(this);

        this.state = {

            storeList : {},
            promoList: {},
            storeActive: 0,

            period: {
        		from: moment().add(-1, 'month'),
        		to: moment()
            },  
            
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
        }
    }

    componentDidMount(){

        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();    
    }

    componentDidUpdate(prevProps){

        const { getPromoDiscountListDispatch, store } = this.props;
        const { period, storeActive } = this.state;
        
        //Get Store List
        if(prevProps.store.list !== store.list) {
            if (store.list.isLoaded) {
            
                this.setState({
                    ...this.state,
                    storeList: store.list.data.data.result.store

                }, () => {

                    let requiredDataPromo = {
                        start_date: period.from.format('YYYY-MM-DD'),
                        end_date: period.to.format('YYYY-MM-DD'),
                        storeid : store.list.data.data.result.store[storeActive]
                    }

                    getPromoDiscountListDispatch(requiredDataPromo);
                })
            }
        }

        //Get Discount list & Populate data
        if(prevProps.store.promo !== store.promo){
            if(store.promo.isLoaded){

                this.setState({
                    ...this.state,
                    promoList: store.promo
                }, () => {
                    console.log(this.state);
                    this.populateTableData();
                    
                })
            }
        }
    }

    populateTableData = () => {

        const { vendorEmployeeList } = this.state;

        const columns = [
            {
                title: 'Discount (%) ',
                accessor: 'discount'
            },
            {
                title: 'Discount berakhir pada tanggal : ',
                accessor: 'title'
            },
            {
                title: 'Aksi',
                accessor: 'action',
                render: (row) => (
                    <td>
                        <a href="#" onClick={() => this.openVendorEmployeeModal(row)}>Ubah</a>

                    </td>
                )
            }
        ]
    }

    render() {
        
        return <AdminStoresPromoView 
                populateTableData = { this.populateTableData}
                {...this.state} 
                {...this.props} />
    }
}

// export default AdminStoresPromo;
export default connect(mapStateToProps, mapDispatchToProps)(AdminStoresPromo); 
