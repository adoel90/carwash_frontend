import React from 'react';
import MainNavigation from '../components/MainNavigation';

class MainSubheader extends React.Component {
	render() {
		const {
			navigationItems,
			isAuthenticated,
			member
		} = this.props;

		if(isAuthenticated) {
			return (
				<div className="header sub-header">
					<MainNavigation items={navigationItems} />
				</div>
			)
		}

		return null;
	}
}

export default MainSubheader;
