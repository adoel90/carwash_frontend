import React, { Component } from 'react';

class NavItem extends Component {

	render() {
		const {
			children
		} = this.props;

		return <ul className="navigation__item">{children}</ul>
	}

}

export default NavItem;
