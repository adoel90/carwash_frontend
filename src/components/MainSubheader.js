import React from 'react';
// import { Nav, NavItem, NavLink } from '../components/Nav';
import { Nav, NavItem, NavLink } from '../components/Nav';

class MainSubheader extends React.Component {
	constructor() {
		super();
		this.renderNavigationItem = this.renderNavigationItem.bind(this);

	
	}

	renderNavigationItem = (navigation, i) => {
		return (
			<NavItem key={i}>
				<NavLink to={navigation.path}>{navigation.name}</NavLink>
			</NavItem>
		)
	}

	render() {
		const {

			isAuthenticated,
			navigations,
			member
		} = this.props;
		
		// console.log(this.props.member);

		if(isAuthenticated) {
			return (
				<div className="header sub-header">
                   
					<Nav className="main-navigation">
						{ navigations.map(this.renderNavigationItem) }
					</Nav>
				</div>
			)
		}

		return <h1>Coba refresh browser !</h1>;
	}
}

export default MainSubheader;
