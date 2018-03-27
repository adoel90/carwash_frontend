import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../../../layouts/Layout';
import { Row, Column } from '../../../layouts/Grid';
import { Menu, MenuList, MenuItem, MenuLink } from '../../../components/Menu';
import { Button } from '../../../components/Button';
import { AdminSidebarHeader, AdminSidebarFooter } from '../AdminLayout';

const AdminSidebar = props => {
    const {
        location,
        menus
    } = props;

    const renderMenuItems = (items) => {
        return items.map((item, i) => {
            return (
                <MenuItem key={i} active={location.pathname === item.path }>
                    <MenuLink to={item.path}>{item.name}</MenuLink>
                </MenuItem>
            )
        })
    }
    
    const renderMenuList = () => {
        return menus.map((menu, i) => {
            return (
                <MenuList key={i} category={menu.category}>
                    { renderMenuItems(menu.items) }
                </MenuList>
            )
        })
    }
    
    return (
        <Sidebar>
            <AdminSidebarHeader {...props} />

            <Menu theme="dark">
                { renderMenuList() }
            </Menu>

            <AdminSidebarFooter {...props} />
        </Sidebar>
    )
};

AdminSidebar.propTypes = {
    
};

export default AdminSidebar;