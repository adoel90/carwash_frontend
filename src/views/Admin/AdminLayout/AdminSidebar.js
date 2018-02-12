import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../../../layouts/Sidebar';
import { Menu, MenuList, MenuItem } from '../../../components/Menu';

const AdminSidebar = props => {
    const {
        routes
    } = props;
    
    const renderMenuItems = () => {
        return routes.map((route, i) => {
            return <MenuItem>{route.name}</MenuItem>
        })
    }
    
    return (
        <Sidebar className="admin-panel__sidebar">
            <Menu>
                <MenuList>
                    { renderMenuItems() }
                </MenuList>
            </Menu>
        </Sidebar>
    );
};

export default AdminSidebar;