import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../../../layouts/Layout';
import { Menu, MenuList, MenuItem, MenuLink } from '../../../components/Menu';

const VendorSidebar = props => {
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
            <Menu theme="dark">
                { renderMenuList() }
            </Menu>
        </Sidebar>
    )
};

VendorSidebar.propTypes = {
    
};

export default VendorSidebar;