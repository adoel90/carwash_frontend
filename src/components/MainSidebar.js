import React from 'react';
import Sticky from '../components/Sticky';

class MainSidebar extends React.Component {
	render() {
		return (
			<aside className="sidebar main-sidebar">
				{this.props.children}
			</aside>
		)
	}
}

export default MainSidebar;
