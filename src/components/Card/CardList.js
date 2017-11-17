import React from 'react';
import { Row } from '../Grid';

class CardList extends React.Component {
	render() {
		return (
			<Row className="card-list">
				{this.props.children}
			</Row>
		)
	}
}

export default CardList;
