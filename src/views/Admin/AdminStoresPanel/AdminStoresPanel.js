//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { VendorDashboard, VendorMenu,VendorLogOut, VendorEmployee, VendorReport  } from '../../Vendor';
import { AdminStoresDashboard, AdminStoresMenu,AdminStoresEmployee, AdminStoresReport, AdminStoresPromo, AdminStoresMenuCreate, AdminStoresEmployeeCreate  } from '../../Admin';
import { AdminStoresPanelView } from '../AdminStoresPanel';
import { getVendorDetail } from '../../../actions/vendor.action';


function mapStateToProps(state) {
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getVendorState: () => dispatch(getVendorDetail())
    }
}

class AdminStoresPanel extends Component {   

    constructor(props) {
        super(props);
        this.getVendorDetail = this.getVendorDetail.bind(this);        
        this.state = {
            vendor : {},
            vendorList :{},
            routes: [
                        // { id: 1, name: 'dashboard', path: `${props.match.url}`, component: AdminStoresDashboard },
                        { id: 1, name: 'list-menu', path: `${props.match.url}/list-menu`, component: AdminStoresMenu },
                        { id: 2, name: 'promo', path: `${props.match.url}/promo`, component: AdminStoresPromo },
                        { id: 3, name: 'employee', path: `${props.match.url}/employee`, component: AdminStoresEmployee },
                        { id: 4, name: 'report', path: `${props.match.url}/report`, component: AdminStoresReport },
                        { id: 5, name: 'menucreate', path: `${props.match.url}/menucreate`, component: AdminStoresMenuCreate },
                        { id: 6, name: 'employeecreate', path: `${props.match.url}/employeecreate`, component: AdminStoresEmployeeCreate },
                        // { id: 6, name: 'promo', path: `${props.match.url}/promo`, component: VendorPromo }
            ],
            menus: [
                    { 
                        category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                        items: []
                    },
                    {
                        category: 'Produk',
                        items: [
                            { id: 1, name: 'Daftar Produk', path: `${props.match.url}/list-menu` },
                            { id: 2, name: 'Buat Menu Produk Baru ', path: `${props.match.url}/menucreate` }
                            
                            
                        ]
                    },
                    {
                        category: 'Manajemen',
                        items: [
                            { id: 3, name: 'Manajemen Staff', path: `${props.match.url}/employee` },
                            { id: 6, name: 'Buat Staff Baru ', path: `${props.match.url}/employeecreate` }
                            
                        ]
                    },
                    {
                        category: 'Laporan',
                        items: [
                            { id: 4, name: 'Laporan Transaksi', path: `${props.match.url}/report` }
                           
                        ]
                    },
                    {
                        category: 'Promosi',
                        items: [
                            { id: 5, name: 'Promo Discount', path: `${props.match.url}/promo` }
                        ]
                    }
            ]
        }
    }

    componentDidMount = () => {
        this.getVendorDetail();
    }

    getVendorDetail = () => {
        const { getVendorState } = this.props;
        getVendorState();
    }


    componentDidUpdate = (prevProps) => {
        const { vendorState } = this.props;
        const { menus, vendorList } = this.state;
        
        if(prevProps.vendorState.list !== vendorState.list) {
       
             this.setState({
                ...this.state,
                vendorList: vendorState.list
            });
        }
    }

    render() {
        return (
            <AdminStoresPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresPanel);