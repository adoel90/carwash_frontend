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
                { id: 2, name: 'user', path: `${props.match.url}/user`, component: AdminUser }
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
                        { id: 2, name: 'Buat User Baru', path: `${props.match.url}/user/create-new` },
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