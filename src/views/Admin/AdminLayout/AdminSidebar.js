import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../../../layouts/Layout';
import { Menu, MenuList, MenuItem, MenuLink } from '../../../components/Menu';

const AdminSidebar = props => {
    const {
        location,
        menus
    } = props;

    const renderMenuItems = (items) => {
        return items.map((item, i) => {
            return (
                <MenuItem key={item.id} active={location.pathname === item.path }>
                    <MenuLink to={item.path}>{item.name}</MenuLink>
                </MenuItem>
            )
        })
    }
    
    const renderMenuList = () => {
        return menus.map((menu, i) => {
            return (
                <MenuList key={menu.id} category={menu.category}>
                    { renderMenuItems(menu.items) }
                </MenuList>
            )
        })
    }
    
    return (
        <Sidebar>
            <Menu theme="dark">
                { renderMenuList() }
            </Menu>
        </Sidebar>
    )
};

AdminSidebar.propTypes = {
    
};

export default AdminSidebar;