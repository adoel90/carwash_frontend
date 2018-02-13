import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminDashboard } from '../../Admin';
import { AdminPanelView } from '../AdminPanel';

class AdminPanel extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                { id: 1, name: 'Dashboard', path: `${props.match.url}/dashboard`, component: AdminDashboard }
            ],
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