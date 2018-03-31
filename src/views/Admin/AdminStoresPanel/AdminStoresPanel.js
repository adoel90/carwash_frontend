import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminStoresDashboard } from '../../Admin';
import { AdminStoresPanelView } from '../AdminStoresPanel';

class AdminStoresPanel extends Component {   

    constructor(props) {

        super(props);   
        this.state = {

            routes: [
                        { id: 1, name: 'dashboard', path: `${props.match.url}`, component: AdminStoresDashboard },
                        // { id : 1, name: 'topup', path: `${props.match.url}/topup-saldo`, component: AdminStoreCashierTopUp },
                        // { id : 2, name: 'kartubaru', path: `${props.match.url}/kartu-baru`, component: AdminStoreCashierNewCard },
                        // { id : 3, name: 'refundkartu', path: `${props.match.url}/refund-kartu`, component: AdminStoreCashierRefund }
                        
            ],
            menus: [
                    { 
                        // category: 'Store Name Selected',
                        category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                        items: [
                            { id: 1, name: 'Dashboard', path: `${props.match.url}` }
                        ]
                    },
                    {
                        category: '',
                        items: [
                            // { id: 1, name: 'Isi Ulang Saldo', path: `${props.match.url}/topup-saldo` },
                            // { id: 2, name: 'Kartu Baru', path: `${props.match.url}/kartu-baru` },
                            // { id: 3, name: 'Refund Kartu', path: `${props.match.url}/refund-kartu` },
                    
                        ]
                    }
            ]
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

export default AdminStoresPanel;