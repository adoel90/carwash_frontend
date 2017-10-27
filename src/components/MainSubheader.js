import React from 'react';
import MainNavigation from '../components/MainNavigation';

class MainSubheader extends React.Component {
	render() {
		const {
			isAuth
		} = this.props;

		if(isAuth) {
			return (
				<div className="header sub-header">
					<MainNavigation />
				</div>
			)
		}

		return null;
	}
}

export default MainSubheader;
