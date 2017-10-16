import React from 'react';

class MainSidebar extends React.Component {
	render() {
		return (
			<aside className="sidebar">
				{this.props.children}
			</aside>
		)
	}
}

export default MainSidebar;
