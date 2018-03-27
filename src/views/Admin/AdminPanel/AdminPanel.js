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
                { name: 'create-user', path: `${props.match.url}/user/create-new-user`, component: AdminUserCreate },
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
            menus: {}
        }

        this.renderMenu = this.renderMenu.bind(this);
    }

    componentWillMount = () => {
        this.renderMenu();
    }

    renderMenu = () => {
        const {
            menus
        } = this.state;
        
        let menu = JSON.parse(localStorage.getItem('userData')).module;

        let newMenu = [];
        let oldMenu = [
            { 
                category: '',
                items: [
                    { name: 'Dashboard', path: `${this.props.match.url}` },
                ]
            },
            {
                category: 'Manajemen Akses',
                items: [
                    { name: 'Daftar Akses', path: `${this.props.match.url}/access` },
                    { name: 'Buat Akses Baru', path: `${this.props.match.url}/create-new-access` }
                ]
            },
            {
                category: 'Manajemen User',
                items: [
                    { name: 'Daftar User', path: `${this.props.match.url}/user` },
                    { name: 'Buat User Baru', path: `${this.props.match.url}/user/create-new-user` }
                ]
            },
            {
                category: 'Manajemen Store',
                items: [
                    { name: 'Daftar Store', path: `${this.props.match.url}/store` },
                    { name: 'Buat Store Baru', path: `${this.props.match.url}/create-new-store` }

                ]
            },
            {
                category: 'Manajemen Kartu',
                items: [
                    { name: 'Daftar Kartu', path: `${this.props.match.url}/card` },
                    { name: 'Buat Kartu Baru', path: `${this.props.match.url}/create-new-card` }
                ]
            },
            {
                category: 'Manajemen Member',
                items: [

                    { name: 'Daftar Member', path: `${this.props.match.url}/member` }
                ]
            },
            {
                category: 'Report',
                items: [
                    { name: 'Report', path: `${this.props.match.url}/report` }
                ]
            }
        ]

        for (let i=0; i<menu.length; i++) {
            let dataMenu = {
                category : menu[i].name,
                items: [
                    { name: `Daftar ${menu[i].name}`, path: `${this.props.match.url}/${menu[i].name}` }
                ]
            }

            newMenu.push(dataMenu);
        }

        this.setState({
            menus: oldMenu
        })
    }
    
    render() {
        return (
            <AdminPanelView
                {...this.state} 
                {...this.props} 
                user={JSON.parse(localStorage.getItem('userData'))}
            />
        )
    }
}

export default AdminPanel;