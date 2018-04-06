import React, { Component } from 'react';
import classNames from 'classnames';

class TabContent extends Component {

	
	renderTab = (data) => {
		const { activeTab, type } = this.props;
		
	}

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
		? <div className={classes} onCLick={this.renderTab(activeTab)}>{children}</div>
		: null
	}

}

export default TabContent;
