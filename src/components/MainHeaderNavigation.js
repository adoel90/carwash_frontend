import React from 'react';

class MainHeaderNavigation extends React.Component {
	constructor() {
		super();
		this.renderNavigationItem = this.renderNavigationItem.bind(this);
	}

	renderNavigationItem = (navigation) => {
		return (
			<a>{ navigation.name }</a>
		)
	}

	render() {
		const {
			navigations
		} = this.props;

		return (
			<nav className="main-navigation header__block">
				<ul>
					{ navigations.map(this.renderNavigationItem) }
				</ul>
			</nav>
		)
	}
}

export default MainHeaderNavigation;
