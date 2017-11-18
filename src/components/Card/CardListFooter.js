import React, { Component } from 'react';

class CardListFooter extends Component {
	render() {
		const {
			children
		} = this.props;

		return (
			<div className="card-list__footer">
				{children}
			</div>
		);
	}

}

export default CardListFooter;
