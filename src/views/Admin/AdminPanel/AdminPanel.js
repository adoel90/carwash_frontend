import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    AdminDashboard, 
    AdminUser, 
    AdminUserCreate,
    AdminUserSettings,
    AdminVendor,
    AdminVendorCreate,
    AdminMember,
    AdminCard,
    AdminCardCreate,
    AdminAccess,
    AdminAccessCreate,
    AdminStore,
    AdminStoreCreate,
    AdminReport,
    AdminLogout
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
                { name: 'member', path: `${props.match.url}/member`, component: AdminMember },
                { name: 'card', path: `${props.match.url}/card`, component: AdminCard },
                { name: 'create-new-card', path: `${props.match.url}/create-new-card`, component: AdminCardCreate },
                { name: 'access', path: `${props.match.url}/access`, component: AdminAccess },
                { name: 'create-new-access', path: `${props.match.url}/create-new-access`, component: AdminAccessCreate },
                { name: 'store', path: `${props.match.url}/store`, component: AdminStore },
                { name: 'create-new-store', path: `${props.match.url}/create-new-store`, component: AdminStoreCreate },
                { name: 'report', path: `${props.match.url}/report`, component: AdminReport },
                { name: 'logout', path: `${props.match.url}/logout`, component: AdminLogout }

            ],
            menus: [
                { 
                    category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                    items: [
                        { name: 'Dashboard', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen User',
                    items: [

                        { name: 'Daftar User', path: `${props.match.url}/user` },
                        { name: 'Buat User Baru', path: `${props.match.url}/user/create-new` }
                    ]
                },
                {
                    category: 'Manajemen Store',
                    items: [
                        { name: 'Daftar Store', path: `${props.match.url}/store` },
                        { name: 'Buat Store Baru', path: `${props.match.url}/create-new-store` }

                    ]
                },
                // {
                //     category: 'Manajemen Vendor',
                //     items: [
                //         { name: 'Daftar Vendor', path: `${props.match.url}/vendor` },
                //         { name: 'Buat Vendor Baru', path: `${props.match.url}/vendor/create-new-vendor` },
                //         { name: 'Pengaturan Vendor', path: `${props.match.url}/vendor/settings`}

                //     ]
                // },
                {
                    category: 'Manajemen Member',
                    items: [

                        { name: 'Daftar Member', path: `${props.match.url}/member` }
                    ]
                },
                {
                    category: 'Manajemen Card',
                    items: [

                        { name: 'Daftar Kartu', path: `${props.match.url}/card` },
                        { name: 'Buat Kartu Baru', path: `${props.match.url}/create-new-card` }
                    ]
                },
                {
                    category: 'Manajemen Akses',
                    items: [

                        { name: 'Daftar Akses', path: `${props.match.url}/access` },
                        { name: 'Buat Akses Baru', path: `${props.match.url}/create-new-access` }
                    ]
                },
                {
                    category: 'Report',
                    items: [
                        { name: 'Report', path: `${props.match.url}/report` }
                    ]
                },
                {
                    category: '',
                    items: [
                        { name: 'Logout', path: `${props.match.url}/logout` }
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