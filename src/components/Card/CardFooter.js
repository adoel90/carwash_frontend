import React, { Component } from 'react';

class CardFooter extends Component {
	render() {
		const {
			children
		} = this.props;

		return <div className="card__footer">{children}</div>
	}

}

export default CardFooter;
