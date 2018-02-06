import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from '../Nav';

class AdminSidebar extends Component {
	constructor() {
		super();
		this.renderNavigationItems = this.renderNavigationItems.bind(this);
	}

	renderNavigationItems = (navigation, i) => {
		return (
			<NavItem key={i}>
				<NavLink to={navigation.path}>{navigation.name}</NavLink>
			</NavItem>
		)
	}

    render() {
    	const {
    		navigations
    	} = this.props;

        return (
            <div className="sidebar sidebar--admin">
                <Nav>
                	{navigations.map(this.renderNavigationItems)}
                </Nav>
            </div>
        );
    }
}

export default AdminSidebar;