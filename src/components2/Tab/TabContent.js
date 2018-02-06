import React, { Component } from 'react';
import classNames from 'classnames';

class TabContent extends Component {

	render() {
		const {
			activeTab,
			tabIndex,
			children,
			className
		} = this.props;

		const classes = classNames(
			className
		)

		return activeTab === tabIndex
		? <div className={classes}>{children}</div>
		: null
	}

}

export default TabContent;
