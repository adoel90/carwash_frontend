import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    AdminDashboard, 
    AdminUser, 
    AdminUserCreate,
    AdminUserSettings,
    AdminVendor,
    AdminVendorCreate
} from '../../Admin';

import { AdminPanelView } from '../AdminPanel';

class AdminPanel extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            routes: [

                { name: 'dashboard', path: `${props.match.url}`, component: AdminDashboard },
                { name: 'user', path: `${props.match.url}/user`, component: AdminUser },
                { name: 'create-user', path: `${props.match.url}/user/create-new`, component: AdminUserCreate },
                { name: 'user-settings', path: `${props.match.url}/user/settings`, component: AdminUserSettings },
                { name: 'vendor', path: `${props.match.url}/vendor`, component: AdminVendor },                
                { name: 'create-new-vendor', path: `${props.match.url}/vendor/create-new-vendor`, component: AdminVendorCreate },                

            ],
            menus: [
                { 
                    category: '805 Carwash',
                    items: [
                        { name: 'Dasbor', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen User',
                    items: [

                        { name: 'Daftar User', path: `${props.match.url}/user` },
                        { name: 'Buat User Baru', path: `${props.match.url}/user/create-new` },
                        { name: 'Pengaturan User', path: `${props.match.url}/user/settings` },
                    ]
                },
                {
                    category: 'Manajemen Vendor',
                    items: [
                        { name: 'Daftar Vendor', path: `${props.match.url}/vendor` },
                        { name: 'Buat Vendor Baru', path: `${props.match.url}/vendor/create-new-vendor` },
                        { name: 'Pengaturan Vendor', path: `${props.match.url}/vendor/settings`}

                    ]
                }
            ]
        }
    }
    
    render() {
        return (
            <AdminPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default AdminPanel;