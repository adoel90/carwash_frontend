import React from 'react';
import PropTypes from 'prop-types';
import { NavigationBar, NavigationList, NavigationItem } from '../../components/Navigation';

const HeaderNavigation = props => {
    const {
        items
    } = props;
    
    const renderNavigationItems = () => {
        return items.map((item, i) => {
            return <NavigationItem key={i}>{item.name}</NavigationItem>
        })
    }
    
    return (
        <NavigationBar>
            <NavigationList>
                { renderNavigationItems() }
            </NavigationList>
        </NavigationBar>
    )
};

HeaderNavigation.propTypes = {
    
};

export default HeaderNavigation;