import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar } from '../../../layouts/Layout';
import { Row, Column } from '../../../layouts/Grid';
import { Menu, MenuList, MenuItem, MenuLink } from '../../../components/Menu';
import { Button } from '../../../components/Button';
import { DocumentationSidebarHeader, DocumentationSidebarFooter } from '../DocumentationLayout';

const DocumentationSidebar = props => {
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
            <DocumentationSidebarHeader {...props} />

            <Menu theme="dark">
                { renderMenuList() }
            </Menu>

            <DocumentationSidebarFooter {...props} />
        </Sidebar>
    )
};

DocumentationSidebar.propTypes = {
    
};

export default DocumentationSidebar;