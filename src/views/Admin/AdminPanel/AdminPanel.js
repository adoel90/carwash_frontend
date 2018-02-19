import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminDashboard, AdminUser, AdminAddUser } from '../../Admin';
import { AdminPanelView } from '../AdminPanel';

class AdminPanel extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                { id: 1, name: 'dashboard', path: `${props.match.url}`, component: AdminDashboard },
                { id: 2, name: 'user', path: `${props.match.url}/user`, component: AdminUser },
                { id: 3, name: 'add-user', path: `${props.match.url}/user/add`, component: AdminAddUser },
                { id: 4, name: 'member', path: `${props.match.url}/member` },
                { id: 5, name: 'card', path: `${props.match.url}/card` },
            ],
            menus: [
                { 
                    category: '805 Carwash',
                    items: [
                        { id: 1, name: 'Dasbor', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen User',
                    items: [
                        { id: 1, name: 'Daftar User', path: `${props.match.url}/user` },
                        { id: 2, name: 'Tambah User Baru', path: `${props.match.url}/user/add` },
                        { id: 3, name: 'Pengaturan User', path: `${props.match.url}/user/settings` },
                    ]
                },
                {
                    category: 'Manajemen Member',
                    items: [
                        { id: 1, name: 'Daftar Member', path: `${props.match.url}/member` },
                        { id: 2, name: 'Pengaturan Member', path: `${props.match.url}/member/add` },
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