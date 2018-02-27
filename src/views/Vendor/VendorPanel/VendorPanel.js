//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { VendorDashboard, VendorUser, VendorCreate, VendorLogOut   } from '../../Vendor';
import { VendorPanelView } from '../VendorPanel';


class VendorPanel extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            
            routes: [
                
                { id: 1, name: 'dashboard', path: `${props.match.url}`, component: VendorDashboard },
                { id: 2, name: 'list-vendor', path: `${props.match.url}/list-vendor`, component: VendorUser },
                { id: 3, name: 'create-vendor', path: `${props.match.url}/vendor/create-vendor`, component: VendorCreate },
                { id: 4, name: 'log-out', path: `${props.match.url}/vendor/log-out`, component: VendorLogOut },

            ],
            menus: [
                { 
                    category: 'Vendor Name Selected',
                    items: [
                        { id: 1, name: 'Dasbor', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen Menu',
                    items: [
                        { id: 1, name: 'Daftar Menu', path: `${props.match.url}/list-vendor` },
                        { id: 2, name: 'Buat Vendor', path: `${props.match.url}/vendor/create-vendor` },
                        { id: 2, name: 'Akun Saya', path: `${props.match.url}/vendor/log-out` },

                        
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <VendorPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default VendorPanel;