import React from 'react';

class CardList extends React.Component {
	render() {
		return (
			<div className="card-list">
				<div className="row">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default CardList;
