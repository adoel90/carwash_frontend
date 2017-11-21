import React, { Component } from 'react';
import { Nav, NavItem } from '../Nav';

class AdminSidebar extends Component {
    render() {
        return (
            <div className="sidebar sidebar--admin">
                <Nav>
                    <NavItem>Pengaturan Member</NavItem>
                    <NavItem>Pengaturan Service</NavItem>
                    <NavItem>Pengaturan Cafe</NavItem>
                    <NavItem>Pengaturan Tipe Kartu</NavItem>
                </Nav>
            </div>
        );
    }
}

export default AdminSidebar;