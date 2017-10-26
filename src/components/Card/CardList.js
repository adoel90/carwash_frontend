import React from 'react';

class CardList extends React.Component {
	render() {
		return (
			<div className="card-list row">
				{this.props.children}
			</div>
		)
	}
}

export default CardList;
