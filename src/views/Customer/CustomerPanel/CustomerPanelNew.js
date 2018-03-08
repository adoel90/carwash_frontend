//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomerDashboard  } from '../../Customer';
import { CustomerPanelNewView } from '../CustomerPanel';


class CustomerPanelNew extends Component {   

    constructor(props) {

        super(props);

        this.state = {

            routes: [
                { id: 1, name: 'dashboard', path: `${props.match.url}`, component: CustomerDashboard }
            ],
            menus: [
                { 
                    category: 'Vendor Name Selected',

                    items: [
                        { id: 1, name: 'Dashboard', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen Menu',
                    items: [
                        { id: 1, name: 'Pengaturan Akun', path: `${props.match.url}/log-out` },
                        { id: 2, name: 'Daftar Produk', path: `${props.match.url}/list-menu` },
                        
                    ]
                }
            ]
        }
    }


    render() {
        return (
            <CustomerPanelNewView
                {...this.state} 
                {...this.props} 
            />

            
        )
    }
}

export default CustomerPanelNew;
