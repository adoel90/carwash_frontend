import React from 'react';

const Sidebar = (props) => {
	const {
		children,
		className
	} = props;

	return <aside className="sidebar">{children}</aside>
}

export default Sidebar;