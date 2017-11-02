import React from 'react';
import MainNavigation from '../components/MainNavigation';

class MainSubheader extends React.Component {
	render() {
		const {
			isAuthenticated,
			user
		} = this.props;

		if(isAuthenticated) {
			return (
				<div className="header sub-header">
					<MainNavigation role={user.level} />
				</div>
			)
		}

		return null;
	}
}

export default MainSubheader;
