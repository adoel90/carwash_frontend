import React, { Component } from 'react';

class Subheader extends Component {
	render() {
		return (
			<div className="main-subheader">
				<Nav className="main-navigation">
					{ items.map(this.renderNavigationItem) }
				</Nav>
			</div>
		);
	}

}

export default Subheader;
