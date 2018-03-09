import React from 'react';
import PropTypes from 'prop-types';
import { SidebarCustomer } from '../../../layouts/Layout';
// import { Menu, MenuList, MenuItem, MenuLink } from '../../../components/Menu';
import { MenuListCustomer, MenuItemCustomer, MenuLinkCustomer } from '../../../components/Menu';

const CustomerSidebar = props => {
    const {
        location,
        menus
    } = props;

    const tes ={
        'margin-left': '10px'

    
    }
    const font ={'color': 'white'}

    const renderMenuItems = (items) => {
        return items.map((item, i) => {
            return (
                <MenuItemCustomer key={i} active={location.pathname === item.path }>
                    <MenuLinkCustomer to={item.path}>{item.name}</MenuLinkCustomer>
                </MenuItemCustomer>
                // <div>
                //     <div style={tes} key={i} active={location.pathname === item.path }>
                //         <MenuLink to={item.path} style={font}>{item.name}</MenuLink>
                //     </div>
                // </div>
            )
        })
    }
    
    const renderMenuList = () => {
        return menus.map((menu, i) => {
            return (
                
                <MenuListCustomer key={i} category={menu.category}>
                    { renderMenuItems(menu.items) }
                </MenuListCustomer>
            )
        })
    }
    
    return (
        // <Sidebar>
        //     <Menu theme="dark">
        //         { renderMenuList() }
        //     </Menu>
        // </Sidebar>
        <div>
            { renderMenuList() }
        </div>
    )
};

CustomerSidebar.propTypes = {
    
};

export default CustomerSidebar;